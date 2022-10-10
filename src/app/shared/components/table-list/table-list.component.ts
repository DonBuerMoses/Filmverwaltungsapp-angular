import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MovieObject} from "../../../types/movie-object";
import {ColumnMetaData} from "../../../types/column-meta-data";
import {DataService} from "../../../services/data.service";
import {MediaMatch} from "../../../enums/media-match.enum";
import {ApplicationArea} from "../../../enums/application-area.enum";

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedColumnsBase: string[] = [];
  dataSource: MatTableDataSource<UserData>;
  private _movieObject: MovieObject;

  get movieObject(): MovieObject {
    return this._movieObject;
  }

  @Input()
  set movieObject(value: MovieObject) {
    this._movieObject = value;
    console.log(this._movieObject)
    this.dataSource = new MatTableDataSource(this.movieObject.data);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    console.log(this._movieObject);


    for (let columnDefinition of this.getDisplayColumnsMetaData()) {
      this.displayedColumnsBase.push(columnDefinition['name']);

      if (columnDefinition.alias?.dataType) {
        this.dataService.getData(columnDefinition.alias.endpoint).subscribe(list => {
          const newDataSourceData = this.dataSource.data.map(data => {
            let newData = {...data};
            newData[columnDefinition.name] = list.filter(element =>
              element[columnDefinition.alias.key] === data[columnDefinition.alias.key])[0][columnDefinition.alias.value];
            return newData;
          });
          console.log(newDataSourceData);
          this.dataSource.data = newDataSourceData;
        })
      }
    }
    this.setDisplayedColumns();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDisplayColumnsMetaData(): ColumnMetaData[] {
    return this.movieObject.columnsMetaData.filter(columnMetaData => columnMetaData.displayIt);
  }

  setDisplayedColumns(): void {
    if (window.matchMedia(MediaMatch.MAX_WIDTH_1000_PX.toString()).matches) {
      let displayedColumnsNew = [];
      this.movieObject.columnsMetaData.forEach(columnMetaData => {
        const foundMedia = (columnMetaData.media) ? columnMetaData.media?.filter(m => m.match === MediaMatch.MAX_WIDTH_1000_PX && m.area === ApplicationArea.TABLE) : [];
        if (((foundMedia.length === 1 && foundMedia[0].visible) || foundMedia.length === 0) &&
          this.displayedColumnsBase.filter(displayedColumnBase => displayedColumnBase === columnMetaData.name).length === 1) {
          displayedColumnsNew.push(columnMetaData.name);
        }
      });
      this.displayedColumns = displayedColumnsNew;
    } else {
      this.displayedColumns = [...this.displayedColumnsBase];
    }
  }

  getMatCellClasses(columnMetaData: ColumnMetaData): string {
    return columnMetaData.clickable ? 'table--container--clickable' : '';
  }
}
