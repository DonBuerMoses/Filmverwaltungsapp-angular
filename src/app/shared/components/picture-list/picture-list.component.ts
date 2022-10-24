import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MovieObject} from "../../../types/movie-object";
import {UserData} from "../table-list/table-list.component";
import {DataService} from "../../../services/data.service";
import {FilmTmdb} from "../../../types/film-tmdb";
import {FilterObject} from "../../../types/filter-object";
import {Film} from "../../../types/film";
import {NavigationPathEnum} from "../../enums/navigation-path.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
export class PictureListComponent implements OnInit {
  public navigationPathEnum = NavigationPathEnum;
  dataSource: MatTableDataSource<UserData>;
  displayedWidgets: string[] = [];
  displayedWidgetsBase: string[] = [];
  private _movieObject: MovieObject;
  public _filmTmdbList: FilmTmdb[] = [];
  private _filteredMovieObject: Film[];

  //@Input()
  public _filterObject: FilterObject;

  get movieObject(): MovieObject {
    return this._movieObject;
  }

  @Input()
  set movieObject(value: MovieObject) {
    this._movieObject = value;
    this._movieObject.data.forEach((data, index) => {
      this.fillFilmTmdbList(data, index);
    });
    console.log('movieObject init:');
    console.log(this._movieObject.data);
  }


  get filterObject(): FilterObject {
    return this._filterObject;
  }

  @Input()
  set filterObject(value: FilterObject) {
    this._filterObject = value;
    console.log("FilterObject:");
    console.log(this._filterObject);


    if (!!!this._movieObject.data) {
      console.log("Data noch leer.");
    } else if (this.filterObject != undefined) {
      console.log("Data nicht leer.");
      this.filterMovieObject();
    } else {
      console.log("Data ist undefined.");
    }
  }

  get filmTmdbList(): FilmTmdb[] {
    return this._filmTmdbList;
  }

  set filmTmdbList(value: FilmTmdb[]) {
    this._filmTmdbList = value;
  }


  get filteredMovieObject(): Film[] {
    return this._filteredMovieObject;
  }

  set filteredMovieObject(value: Film[]) {
    this._filteredMovieObject = value;
  }

  /**
   * Befüllt die _filmTmdbList mit Daten durch getTmdbFilm()
   * @param data beinhaltet Daten vom Typ Film
   * @param index Index des Arrays
   */
  public fillFilmTmdbList(data: any, index: number) {

    this.dataService.getTmdbFilm(data).subscribe(filmTmdb => {
        this._filmTmdbList.push(filmTmdb);
        this._movieObject.data[index].filmTmdb = filmTmdb;
      }
    );
  }

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {

  }

  /*ngOnChanges() {
    console.log("ngOnChanges");

  }*/

  filterMovieObject(): boolean {
    this._filteredMovieObject = this._movieObject.data;
    if (this.filterObject.suchbegriff !== "") {
      this._filteredMovieObject = this._filteredMovieObject.filter(data => data.filmTmdb['title'].toLowerCase().indexOf(this._filterObject.suchbegriff.toLowerCase()) !== -1);
    }
    if (this._filterObject.bewertung[0] !== this._filterObject.bewertung[1]) {
      this._filteredMovieObject = this._filteredMovieObject.filter(data => data['bewertung'] >= this._filterObject.bewertung[0] && data['bewertung'] <= this._filterObject.bewertung[1]);
    } else {
      this._filteredMovieObject = this._filteredMovieObject.filter(data => data['bewertung'] === this._filterObject.bewertung[0]);
    }
    if (this._filterObject.dauer[0] !== this._filterObject.dauer[1]) {
      this._filteredMovieObject = this._filteredMovieObject.filter(data => data.filmTmdb['runtime'] >= this._filterObject.dauer[0] && data.filmTmdb['runtime'] <= this._filterObject.dauer[1]);
    } else {
      this._filteredMovieObject = this._filteredMovieObject.filter(data => data.filmTmdb['runtime'] === this._filterObject.dauer[0]);
    }
    if (this._filterObject.jahr[0] !== this._filterObject.jahr[1]) {
      this._filteredMovieObject = this._filteredMovieObject.filter(data => Date.parse(data.filmTmdb['release_date']) >= Date.parse(this._filterObject.jahr[0] + '-01-01') && Date.parse(data.filmTmdb['release_date']) <= Date.parse(this._filterObject.jahr[1] + '-12-31'));
    } else {
      this._filteredMovieObject = this._filteredMovieObject.filter(data => Date.parse(data.filmTmdb['release_date']) >= Date.parse(this._filterObject.jahr[0] + '01-01') && Date.parse(data.filmTmdb['release_date']) <= Date.parse(this._filterObject.jahr[0] + '12-31'));
    }
    if (this._filterObject.nurFavoriten) {
      this._filteredMovieObject = this._filteredMovieObject.filter(data => data['favorit'] === this._filterObject.nurFavoriten);
    }
    if (this.filterObject.genres.length !== 0) {
      this._filteredMovieObject = this._filteredMovieObject.filter(data => data.filmTmdb.genres.every(genre => {
        if (this.filterObject.genres.includes(genre['id']) === true) {
          return true;
        }
      }));
    }
    console.log("FilteredMovieObject:");
    console.log(this._filteredMovieObject);
    return true;

  }

  public navigateTo(navigationPath: any) {
    this.router.navigate([navigationPath]);
  }

}
