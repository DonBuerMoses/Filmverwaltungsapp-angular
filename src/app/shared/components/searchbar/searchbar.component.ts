import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Options} from 'ng5-slider';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {concat, Subscription} from "rxjs";
import {ColumnMetaData} from "../../../types/column-meta-data";
import {MovieObject} from "../../../types/movie-object";
import {GenreTmdb} from "../../../types/genre-tmdb";
import {FilterObject} from "../../../types/filter-object";
import {MatSelectChange} from "@angular/material/select";



@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
/**
 * Die Searchbar-Komponente enthält die Suchleiste und die Filtereinstellungen der Startseite
 */
export class SearchbarComponent implements OnInit {
  public formGroup: FormGroup;
  public availableColumns: ColumnMetaData[];
  private searchTextSubscription: Subscription;
  private _genreTmdb: GenreTmdb;
  public _filterObject: FilterObject = {
    suchbegriff: "",
    bewertung: [0, 5],
    dauer: [0, 300],
    genre: -1,
    jahr: [1900, 2022],
    speichermedium: -1,
    nurFavoriten: false,
    nichtBewertet: true
  };
  filterOpen = false;
  valueJahre: number = 1900;
  highValueJahre: number = 2022;
  optionsJahre: Options = {
    showTicksValues: true,
    stepsArray: [
      {value: 1900},
      {value: 1940},
      {value: 1950},
      {value: 1960},
      {value: 1970},
      {value: 1980},
      {value: 1990},
      {value: 2000},
      {value: 2010},
      {value: 2022}
    ]
  };
  valueBewertung: number = 1;
  highValueBewertung: number = 5;
  optionsBewertung: Options = {
    //customStepDefinition:
    showTicksValues: false,
    showTicks: true,
    showSelectionBar: false,
    hideLimitLabels: true,
    //hidePointerLabels: true,
    stepsArray: [
      {value: 1},
      {value: 1.5},
      {value: 2},
      {value:2.5},
      {value: 3},
      {value: 3.5},
      {value: 4},
      {value: 4.5},
      {value: 5}
    ]
  };
  valueLaufzeit: number = 0;
  highValueLaufzeit: number = 300;
  optionsLaufzeit: Options = {
    showTicksValues: true,
    stepsArray: [
      {value: 0},
      {value: 30},
      {value: 60},
      {value: 90},
      {value: 120},
      {value: 150},
      {value: 180},
      {value: 240},
      {value: 300}
    ]
  };
  speichermedien = new FormControl({});
  genres = new FormControl({});
  private _movieObject: MovieObject;

  get movieObject(): MovieObject {
    return this._movieObject;
  }

  @Input()
  set movieObject(value: MovieObject) {
    this._movieObject = value;
    console.log(this._movieObject)
  }

  get genreTmdb(): GenreTmdb {
    return this._genreTmdb;
  }

  @Input()
  set genreTmdb(value: GenreTmdb) {
    this._genreTmdb = value;
  }

  @Output()
  public filterChanged: EventEmitter<FilterObject> = new EventEmitter<FilterObject>();

  private _searchText: string = "";
  public showFilterbarSelectList = false;

  get searchText(): string {
    return this._searchText;
  }

  @Input()
  set searchText(value: string) {
    this._searchText = value;
    console.log(`searchbar component ${this.searchText}`);
    //this.reset();
  }

  get filterObject(): FilterObject {
    return this._filterObject;
  }

  set filterObject(value: FilterObject) {
    this._filterObject = value;
  }

  /**
   * Methode, die bei Eingabe in der Searchbar aufgerufen wird.
   * Befüllt das filterObject mit dem Suchtext und den Filtereinstellungen und ruft den Eventemitter searchTextChanged auf,
   * der das filterObject an die Parent-Komponente weitergibt.
   */
  sendFilter() {
    this._filterObject.suchbegriff = this.searchText;
    this._filterObject.bewertung = [this.valueBewertung, this.highValueBewertung];
    this._filterObject.dauer = [this.valueLaufzeit, this.highValueLaufzeit];
    this._filterObject.jahr = [this.valueJahre, this.highValueJahre];
    /*Object.keys(this.genres.value).forEach(key => {
      this._filterObject.genres[key] = this.genres.value[key]['id'];
    });
    Object.keys(this.speichermedien.value).forEach(key => {
      this._filterObject.speichermedien[key] = this.speichermedien.value[key]['speichermedien_ID'];
    });*/
    if (this.genres.value['id'] !== undefined) {
      console.log(this.genres.value);
      this._filterObject.genre = Number.parseInt(this.genres.value['id']);
    }
    if (this.speichermedien.value['speichermedien_ID'] !== undefined) {
      this._filterObject.speichermedium = Number.parseInt(this.speichermedien.value['speichermedien_ID']);
    }
    this.filterChanged.emit(this._filterObject);
  }


  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchTextSubscription = this.formGroup.controls.searchText.valueChanges.subscribe((value) => {

      if (value !== null && value !== undefined) {
        const valueTrimmed = value.trim();
        this.filterChanged.emit(valueTrimmed);
        if (valueTrimmed.length > 0) {
          this.showFilterbarSelectList = true;
          return;
        }
      }
      this.showFilterbarSelectList = false;
    });

    this.reset();
  }

  /**
   * Klappt das FilterObject auf bzw. zu.
   */
  public onFilterClick(): void {
    if (this.filterOpen) {
      this.filterOpen = false;
    } else {
      this.filterOpen = true;
    }
  }

  /**
   * setzt den boolean-Wert im filterObject abhängig von der Favoriten-Checkbox im Filter
   */
  public onFavoritenCheckboxClick(): void {
    if (this.filterObject.nurFavoriten === false) {
      this.filterObject.nurFavoriten = true;
    } else {
      this.filterObject.nurFavoriten = false;
    }
    this.sendFilter();
  }

  /**
   * setzt den boolean-Wert im filterObject abhängig von der Favoriten-Checkbox im Filter
   */
  public onBewertungCheckboxClick(): void {
    if (this.filterObject.nichtBewertet === false) {
      this.filterObject.nichtBewertet = true;
    } else {
      this.filterObject.nichtBewertet = false;
    }
    this.sendFilter();
  }


  private reset() {
    this.searchText = "";
  }

  /**
   * befüllt genre oder speichermedien, abhängig vom type
   * @param value der Wert vom Select
   * @param type  genre oder speichermedien
   */
  sendSelect(value: MatSelectChange, type: string): void {
    if(type === 'speichermedien') {
      if(!value.value) {
        this.speichermedien = new FormControl({speichermedien_ID: -1, bezeichnung: ''});
      } else {
        this.speichermedien = new FormControl(value.value);
      }
      this.sendFilter();
    }
    if(type === 'genres') {
      if(!value.value) {
        this.genres = new FormControl({id: -1, name: ''});
      } else {
        this.genres = new FormControl(value.value);
      }
      this.sendFilter();
    }
  }


}
