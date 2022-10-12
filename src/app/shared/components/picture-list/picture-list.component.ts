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
  public _filmTmdbList: FilmTmdb[] = [];

  get movieObject(): MovieObject {
    return this._movieObject;
  }

  @Input()
  set movieObject(value: MovieObject) {
    this._movieObject = value;
    console.log('Set movieObject');
    console.log(this._movieObject);
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
   */
  public fillFilmTmdbList(data: any) {

    console.log(data);

      this.dataService.getTmdbFilm(data).subscribe(filmTmdb => {
          this._filmTmdbList.push(filmTmdb);
        }
      );
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log(this._movieObject.data);
    this._movieObject.data.forEach(data => {
      this.fillFilmTmdbList(data);
    });
    console.log('Film_TMDB_List init:');
    console.log(this._filmTmdbList);
  }

}
