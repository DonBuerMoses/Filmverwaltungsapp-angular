import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {DataService} from "../services/data.service";
import {MovieObject} from "../types/movie-object";

export interface Chip {
  name: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  directors: Chip[] = [];
  genres: Chip[] = [];
  chips: Chip[] = [];
  languages: Chip[] = [];
  private _movieObject: MovieObject;


  get movieObject(): MovieObject {
    return this._movieObject;
  }

  set movieObject(value: MovieObject) {
    this._movieObject = value;
  }

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAllData()
      .subscribe(movieObjects => {
          this.movieObject = movieObjects[0];
          console.log(this.movieObject);
        }
      );
  }

  addDirector(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.directors.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  removeDirector(director: Chip): void {
    const index = this.directors.indexOf(director);

    if (index >= 0) {
      this.directors.splice(index, 1);
    }
  }

  addGenre(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.genres.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  removeGenre(genre: Chip): void {
    const index = this.genres.indexOf(genre);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  addCountry(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our chip
    if ((value || '').trim()) {
      this.chips.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeCountry(chip: Chip): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  addLanguage(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.languages.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  removeLanguage(language: Chip): void {
    const index = this.languages.indexOf(language);

    if (index >= 0) {
      this.languages.splice(index, 1);
    }
  }

  onAddPictureClick(): void {
    console.log('Bild hinzufügen');
  }

  onEditFilmClick(): void {
    console.log('Film bearbeiten');
  }

  onDeleteFilmClick(): void {
    console.log('Film löschen');
  }

  onAddFilmClick(): void {
    console.log('Film hinzufügen');
  }

  onStorageMediumClick(): void {
    console.log('Neues Speichemedium');
  }

}
