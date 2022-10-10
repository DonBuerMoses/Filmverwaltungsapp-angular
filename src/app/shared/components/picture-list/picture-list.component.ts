import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MovieObject} from "../../../types/movie-object";
import {UserData} from "../table-list/table-list.component";
import {ColumnMetaData} from "../../../types/column-meta-data";
import {DataService} from "../../../services/data.service";

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

  get movieObject(): MovieObject {
    return this._movieObject;
  }

  @Input()
  set movieObject(value: MovieObject) {
    this._movieObject = value;
    console.log(this._movieObject);
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

}
