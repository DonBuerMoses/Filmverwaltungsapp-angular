import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {MovieObject} from "../types/movie-object";
import {GenreTmdb} from "../types/genre-tmdb";

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
  private _searchText: string;

  get searchText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
  }


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllData().subscribe(movieObjects => {
      this.movieObjects = movieObjects;
      this.isLoading = false;
    });
    this.dataService.getAllData().subscribe(movieObjects => {
      this.movieObjects = movieObjects;
      this.isLoading = false;
    });
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
    console.log(datatype);
    console.log(this.movieObjects.filter(movieObject => movieObject.dataType === datatype)[0]);
    console.log(this.movieObjects.forEach(movieObject => {
        console.log(movieObject.dataType);
    }));
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

  onSearchTextChanged($event: string) {
    this._searchText = $event;
    console.log(this._searchText);
  }

  getSearchText(): String {
    if(!!! this.searchText) {
      return undefined;
    }
    return this.searchText;
  }
}
