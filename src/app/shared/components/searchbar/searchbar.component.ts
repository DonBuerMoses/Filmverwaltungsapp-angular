import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Options} from 'ng5-slider';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {ColumnMetaData} from "../../../types/column-meta-data";
import {MovieObject} from "../../../types/movie-object";
import {GenreTmdb} from "../../../types/genre-tmdb";
import {FilterObject} from "../../../types/filter-object";



@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  public formGroup: FormGroup;
  public availableColumns: ColumnMetaData[];
  private searchTextSubscription: Subscription;
  private _genreTmdb: GenreTmdb;
  public _filterObject: FilterObject = {
    suchbegriff: "",
    bewertung: [1, 5],
    dauer: [0, 210],
    genres: [],
    jahr: [1930, 2022],
    speichermedien: [],
    nurFavoriten: false
  };
  filterOpen = false;
  valueJahre: number = 1930;
  highValueJahre: number = 2022;
  optionsJahre: Options = {
    showTicksValues: true,
    stepsArray: [
      {value: 1930},
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
    showTicksValues: true,
    stepsArray: [
      {value: 1},
      {value: 2},
      {value: 3},
      {value: 4},
      {value: 5}
    ]
  };
  valueLaufzeit: number = 0;
  highValueLaufzeit: number = 210;
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
      {value: 210}
    ]
  };
  speichermedien = new FormControl('');
  genres = new FormControl('');
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
   * Methode, die bei Eingabe in der Searchbar aufgerufen wird. Ruft den Eventemitter searchTextChanged auf, der den searchText an die Parent-Komponente weitergibt.
   */
  sendFilter() {
    /*this.searchTextSubscription = this.formGroup.controls.searchText.valueChanges.subscribe((value) => {

      if (value !== null && value !== undefined) {
        const valueTrimmed = value.trim();
        console.log(valueTrimmed);
        //this.availableColumns = this.getAvailableColumns(valueTrimmed);
        this.searchTextChanged.emit(valueTrimmed);
        if (valueTrimmed.length > 0) {
          this.showFilterbarSelectList = true;
          return;
        }
      }
      this.showFilterbarSelectList = false;
    });*/
    this._filterObject.suchbegriff = this.searchText;
    this._filterObject.bewertung = [this.valueBewertung, this.highValueBewertung];
    this._filterObject.dauer = [this.valueLaufzeit, this.highValueLaufzeit];
    this._filterObject.jahr = [this.valueJahre, this.highValueJahre];
    Object.keys(this.genres.value).forEach(key => {
      this._filterObject.genres[key] = this.genres.value[key]['id'];
    });
    Object.keys(this.speichermedien.value).forEach(key => {
      this._filterObject.speichermedien[key] = this.speichermedien.value[key]['speichermedien_ID'];
    });
    this.filterChanged.emit(this._filterObject);
  }


  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    //this.formGroup = this.createFormGroup();
    this.searchTextSubscription = this.formGroup.controls.searchText.valueChanges.subscribe((value) => {

      if (value !== null && value !== undefined) {
        const valueTrimmed = value.trim();
        //this.availableColumns = this.getAvailableColumns(valueTrimmed);
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
   * Methode, die die FilterObject auf- bzw. zuklappt.
   */
  public onFilterClick(): void {
    if (this.filterOpen) {
      this.filterOpen = false;
    } else {
      this.filterOpen = true;
    }
  }

  public onCheckboxClick(): void {
    if (this.filterObject.nurFavoriten === false) {
      this.filterObject.nurFavoriten = true;
    } else {
      this.filterObject.nurFavoriten = false;
    }
    this.sendFilter();
  }

  /*private getAvailableColumns(searchText: string): ColumnMetaData[] {
    const searchTextDataTypes = this.DataUtils.getDataType(searchText);
    return this.genericObject?.columnsMetaData?.filter(columnMetaData => {
      return searchTextDataTypes.filter(dataType => dataType === columnMetaData.type).length > 0;
    });
  }*/

  /*private createFormGroup(): FormGroup {
    return this._formBuilder.group({searchText: ''});
  }*/

  /*private reset() {
    if (this.formGroup) {
      this.formGroup.reset({searchText: this.searchText});
    }
  }*/

  private reset() {
    this.searchText = "";
  }


}
