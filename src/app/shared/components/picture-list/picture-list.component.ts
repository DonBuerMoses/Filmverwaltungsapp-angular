import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MovieObject} from "../../../types/movie-object";
import {UserData} from "../table-list/table-list.component";
import {ColumnMetaData} from "../../../types/column-meta-data";
import {DataService} from "../../../services/data.service";
import {FilmTmdb} from "../../../types/film-tmdb";

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
export class PictureListComponent implements OnInit {
  dataSource: MatTableDataSource<UserData>;
  displayedWidgets: string[] = [];
  displayedWidgetsBase: string[] = [];
  private _movieObject: MovieObject;
  private _searchText: String;
  public _filmTmdbList: FilmTmdb[] = [];

  get movieObject(): MovieObject {
    return this._movieObject;
  }

  @Input()
  set movieObject(value: MovieObject) {
    this._movieObject = value;
    this._movieObject.data.forEach((data, index) => {
      this.fillFilmTmdbList(data, index);
    });
    console.log('Film_TMDB_List init:');
    console.log(this._movieObject.data)
  }


  get searchText(): String {
    return this._searchText;
  }

  @Input()
  set searchText(value: String) {
    this._searchText = value;
  }

  get filmTmdbList(): FilmTmdb[] {
    return this._filmTmdbList;
  }

  set filmTmdbList(value: FilmTmdb[]) {
    this._filmTmdbList = value;
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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

}
