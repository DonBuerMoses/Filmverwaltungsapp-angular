import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../services/data.service";
import {SearchTmdbObject} from "../types/search-film-tmdb-object";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {AddDetailsComponent} from "../shared/components/add-details/add-details.component";
import {Film} from "../types/film";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
/**
 * AddComponent ist die Komponente, die es ermöglicht die TMDB nach Filmen zu durchsuchen und diese zur eigenen Filmliste hinzuzufügen.
 */
export class AddComponent implements OnInit {
  private _searchText: string = "";
  private _filmTmdbList: SearchTmdbObject;
  private _userFilmList: Film[];
  isLoading = true;

  // MatPaginator Output
  private _pageEvent: PageEvent;

  get searchText(): string {
    return this._searchText;
  }

  @Input()
  set searchText(value: string) {
    this._searchText = value;
    //console.log(`searchbar component ${this.searchText}`);
    //this.reset();
  }

  get filmTmdbList(): SearchTmdbObject {
    return this._filmTmdbList;
  }

  set filmTmdbList(value: SearchTmdbObject) {
    this._filmTmdbList = value;
  }

  get pageEvent(): PageEvent {
    return this._pageEvent;
  }

  set pageEvent(value: PageEvent) {
    this._pageEvent = value;
    this.paginatorTop.pageIndex = value.pageIndex;
    this.paginatorBottom.pageIndex = value.pageIndex;
    this.sendFilter();
  }

  get userFilmList(): Film[] {
    return this._userFilmList;
  }

  set userFilmList(value: Film[]) {
    this._userFilmList = value;
  }

  @ViewChild('paginatorTop') paginatorTop: MatPaginator;
  @ViewChild('paginatorBottom') paginatorBottom: MatPaginator;

  /**
   * Konstruktor
   * @param dataService
   * @param dialog
   * @param _snackBar
   */
  constructor(private dataService: DataService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  /**
   * Wird bei Initialisierung der Komponente ausgeführt.
   * Speichert alle Filme des angemeldeten Nutzers in userFilmList
   */
  ngOnInit(): void {
    this.dataService.getFilmeOfNutzer("tobiasollmaier@gmail.com").subscribe(userFilmList => {
      this.userFilmList = userFilmList;
      this.isLoading = false;
    });
  }

  /**
   * searchTextChanged wird bei einer Eingabe in der Suchleiste aufgerufen
   * und setzt den Paginator wieder auf die erste Seite und ruft danach sendFilter() auf.
   */
  searchTextChanged() {
    if (this.pageEvent) {
      this.pageEvent.pageIndex = 0;
      this.paginatorTop.firstPage();
      this.paginatorBottom.firstPage();
      console.log("PageIndex to " + this.pageEvent.pageIndex);
    }
    if (this.searchText.trim() === "") {
      this.filmTmdbList.results = [];
    }
    this.sendFilter();
  }

  /**
   * sendFilter() holt die Ergebnisliste des Suchbegriffs searchText über den dataService,
   * wenn der searchText nicht leer ist.
   */
  sendFilter() {
    console.log(this.searchText);
    if (this.searchText !== "") {
      if (this.pageEvent) {
        this.dataService.getTmdbFilmeByText(this.searchText, this.pageEvent.pageIndex + 1).subscribe(filmTmdbList => {
          this.filmTmdbList = filmTmdbList;
          console.log(this.filmTmdbList);
        });
      } else {
        this.dataService.getTmdbFilmeByText(this.searchText, 1).subscribe(filmTmdbList => {
          this.filmTmdbList = filmTmdbList;
          console.log(this.filmTmdbList);
        });
      }
    }
  }

  /**
   * Öffnet einen Dialog, der Details zu dem angeklickten Film anzeigt und diesen zur eigen Filmliste hinzufügen lässt.
   * @param id die ID des ausgewählten Films
   */
  openDialog(id: number): void {
    if (this.userFilmList.find(film => film.film_ID === id) !== undefined) {
      this._snackBar.open("Dieser Film existiert bereits in Ihrer Liste.", "OK");
    } else {
      const dialogRef = this.dialog.open(AddDetailsComponent, {
        width: '80%',
        maxWidth: '60rem',
        maxHeight: '80%',
        data: {film_ID: id, email: "tobiasollmaier@gmail.com", bewertung: 1, favorit: false, speichermedien_id: 1},
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog geschlossen');
        //this.animal = result;
      });
    }
  }

}
