import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MovieObject} from "../../../types/movie-object";
import {DataService} from "../../../services/data.service";
import {FilmTmdb} from "../../../types/film-tmdb";
import {FilterObject} from "../../../types/filter-object";
import {Film} from "../../../types/film";
import {NavigationPathEnum} from "../../enums/navigation-path.enum";
import {Router} from "@angular/router";
import {FilmeInfo} from "../../../types/filme-info";

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
/**
 * Die Picture-List-Komponente ist für die Darstellung der Widgets auf der Startseite zuständig
 */
export class PictureListComponent implements OnInit {
  public navigationPathEnum = NavigationPathEnum;
  displayedWidgets: string[] = [];
  displayedWidgetsBase: string[] = [];
  private _filteredMovieObject: FilmeInfo[];

  get filteredMovieObject(): FilmeInfo[] {
    return this._filteredMovieObject;
  }

  @Input()
  set filteredMovieObject(value: FilmeInfo[]) {
    this._filteredMovieObject = value;
  }

  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {

  }

  /**
   * Leitet zu einer anderen Seite weiter, abhängig vom mitgegebenen Pfad.
   * @param navigationPath
   */
  public navigateTo(navigationPath: any) {
    this.router.navigate([navigationPath]);
  }

}
