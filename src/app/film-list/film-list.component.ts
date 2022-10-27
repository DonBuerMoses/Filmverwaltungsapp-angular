import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {MovieObject} from "../types/movie-object";
import {GenreTmdb} from "../types/genre-tmdb";
import {FilterObject} from "../types/filter-object";

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {
  viewSelected: string = 'picture';
  isLoading = true;
  public movieObjects: MovieObject[];
  public userMovieObject: MovieObject;
  public genreTmdb: GenreTmdb;
  private _filterObject: FilterObject = {
    suchbegriff: "",
    bewertung: [1, 5],
    dauer: [0, 210],
    genres: [],
    jahr: [1930, 2022],
    speichermedien: [],
    nurFavoriten: false
  };

  get filterObject(): FilterObject {
    return this._filterObject;
  }

  set filterObject(value: FilterObject) {
    this._filterObject = value;
  }


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllData().subscribe(movieObjects => {
      this.movieObjects = movieObjects;
      this.isLoading = false;
    });
    /*this.dataService.getAllData().subscribe(movieObjects => {
      this.movieObjects = movieObjects;
      this.isLoading = false;
    });*/
    this.dataService.getTmdbGenres().subscribe( genreTmdb => {
      this.genreTmdb = genreTmdb;
      console.log(this.genreTmdb);
    })
  }

  onViewSelectClick(viewSelected: string) {
    this.viewSelected = viewSelected;
    console.log(this.viewSelected);
  }

  getMovieObject(datatype: String): MovieObject {
    if(!!! this.movieObjects) {
      return undefined;
    }
    console.log("GetMovieObject: ");
    console.log(this.movieObjects);
    return this.movieObjects.filter(movieObject => movieObject.dataType === datatype)[0];
  }

  getUserMovieObject(): MovieObject {
    if(!!! this.userMovieObject) {
      return undefined;
    }
    return this.userMovieObject;
  }

  getGenreTmdb(): GenreTmdb {
    if(!!! this.genreTmdb) {
      return undefined;
    }
    return this.genreTmdb;
  }

  onSearchTextChanged($event: FilterObject) {
    this._filterObject = $event;
    console.log(this._filterObject);
  }

  getFilter(): FilterObject {
    if(!!! this.filterObject) {
      return undefined;
    }
    return this.filterObject;
  }
}
