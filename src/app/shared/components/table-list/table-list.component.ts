import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MovieObject} from "../../../types/movie-object";
import {ColumnMetaData} from "../../../types/column-meta-data";
import {DataService} from "../../../services/data.service";
import {FilmeInfo} from "../../../types/filme-info";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

/*export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}*/

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
/**
 * Diese Komponente ist für die Darstellung der Tabellenansicht auf der Startseite zuständig
 */
export class TableListComponent implements AfterViewInit {
  displayedColumns: string[] = [];
  displayedColumnsBase: string[] = [];
  dataSource: MatTableDataSource<FilmeInfo>;
  private _movieObject: MovieObject;
  private _filteredMovieObject: FilmeInfo[];

  get filteredMovieObject(): FilmeInfo[] {
    return this._filteredMovieObject;
  }

  @Input()
  set filteredMovieObject(value: FilmeInfo[]) {
    this._filteredMovieObject = value;
    this.dataSource = new MatTableDataSource<FilmeInfo>();
    //this.dataSource.sort = this.sort;
    console.log('DataSource:');
    console.log(this.dataSource);
  }

  get movieObject(): MovieObject {
    return this._movieObject;
  }

  @Input()
  set movieObject(value: MovieObject) {
    this._movieObject = value;
    console.log("Table List MovieObject: ")
    console.log(this._movieObject)
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  input: any;

  /**
   * Konstruktor
   * @param _liveAnnouncer
   */
  constructor(private _liveAnnouncer: LiveAnnouncer) {
  }

  /**
   * Bei Initialisierung aufgerufen
   */
  ngOnInit(): void {
    console.log(this._movieObject);

    /*for (let columnDefinition of this.getDisplayColumnsMetaData()) {
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
    }*/
    this.setDisplayedColumns();
  }

  /**
   * Setzt den Wert des Paginator
   */
  ngAfterViewInit(): void {
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /*getDisplayColumnsMetaData(): ColumnMetaData[] {
    return this.movieObject.columnsMetaData.filter(columnMetaData => columnMetaData.displayIt);
  }*/

  /**
   * bestimmt, welche und wieviele Spalten angezeigt werden
   */
  setDisplayedColumns(): void {
    this.displayedColumns = ["titel", "bewertung", "favorit", "speichermedium", "release_date", "runtime"];
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
