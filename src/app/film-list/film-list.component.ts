import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {MovieObject} from "../types/movie-object";

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {
  viewSelected: string = 'picture';
  isLoading = true;
  public movieObjects: MovieObject[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllData().subscribe(movieObjects => {
      this.movieObjects = movieObjects;
      this.isLoading = false;
      console.log(this.movieObjects);
    });
  }

  onViewSelectClick(viewSelected: string) {
    this.viewSelected = viewSelected;
    console.log(this.viewSelected);
  }

  getMovieObject(datatype: String): MovieObject {
    if(!!! this.movieObjects) {
      return undefined;
    }
    console.log(this.movieObjects.filter(movieObject => movieObject.dataType === datatype)[0])
    return this.movieObjects.filter(movieObject => movieObject.dataType === datatype)[0];
  }
}
