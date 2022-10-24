import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../services/data.service";
import {FilmTmdb} from "../types/film-tmdb";
import {SearchTmdbObject} from "../types/search-film-tmdb-object";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {AddDetailsComponent} from "../shared/components/add-details/add-details.component";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  private _searchText: string = "";
  private _filmTmdbList: SearchTmdbObject;

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

  @ViewChild('paginatorTop') paginatorTop: MatPaginator;
  @ViewChild('paginatorBottom') paginatorBottom: MatPaginator;

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
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

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(AddDetailsComponent, {
      width: '80%',
      maxWidth: '60rem',
      maxHeight: '80%',
      data: {film_ID: id, email: "tobiasollmaier@gmail.com", bewertung: 1, favorit: false, speichermedien_id: 1},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
