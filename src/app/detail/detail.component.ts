import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {DataService} from "../services/data.service";
import {MovieObject} from "../types/movie-object";
import {ActivatedRoute} from "@angular/router";
import {Film} from "../types/film";
import {Cast, Crew} from "../types/cast-tmdb";

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
  actors: Chip[] = [];
  genres: Chip[] = [];
  countries: Chip[] = [];
  languages: Chip[] = [];
  private _movieObject: MovieObject;
  private _filmObject: Film;
  private _castTmdbCrew: Crew[];
  private _castTmdbCast: Cast[];


  get movieObject(): MovieObject {
    return this._movieObject;
  }

  set movieObject(value: MovieObject) {
    this._movieObject = value;
  }

  get filmObject(): Film {
    return this._filmObject;
  }

  set filmObject(value: Film) {
    this._filmObject = value;
  }

  get castTmdbCrew(): Crew[] {
    return this._castTmdbCrew;
  }

  set castTmdbCrew(value: Crew[]) {
    this._castTmdbCrew = value;
  }

  get castTmdbCast(): Cast[] {
    return this._castTmdbCast;
  }

  set castTmdbCast(value: Cast[]) {
    this._castTmdbCast = value;
  }

  constructor(public dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getAllData()
      .subscribe(movieObjects => {
          this.movieObject = movieObjects[0];
          console.log(this.movieObject);
        }
      );
    this.getFilm();
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

  addActor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.actors.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  removeActor(actor: Chip): void {
    const index = this.actors.indexOf(actor);

    if (index >= 0) {
      this.actors.splice(index, 1);
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
      this.countries.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeCountry(chip: Chip): void {
    const index = this.countries.indexOf(chip);

    if (index >= 0) {
      this.countries.splice(index, 1);
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

  onEditFilmClick(): void {
    console.log('Film bearbeiten');
  }

  onDeleteFilmClick(): void {
    console.log('Film löschen');
    this.dataService.deleteFilm(this.filmObject).subscribe();
  }

  onAddFilmClick(): void {
    console.log('Film hinzufügen');
  }

  onStorageMediumClick(): void {
    console.log('Neues Speichemedium');
  }

  getFilm(): void {
    console.log('getFilm:');
    const email = String(this.route.snapshot.paramMap.get('email'));
    console.log(email);
    const filmId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(filmId);

    this.dataService.getFilmOfNutzerById(email, filmId).subscribe(filmObject => {
      this.filmObject = filmObject;
      console.log(this.filmObject);
      this.dataService.getTmdbFilm(this.filmObject).subscribe(filmTmdb => {
        this.filmObject.filmTmdb = filmTmdb;
        console.log(this.filmObject.filmTmdb);
        this.filmObject.filmTmdb.genres.forEach(genre => this.genres.push({name: genre.name.trim()}))
        this.filmObject.filmTmdb.production_countries.forEach(country => this.countries.push({name: country.name.trim()}))
        this.filmObject.filmTmdb.spoken_languages.forEach(country => this.languages.push({name: country.english_name.trim()}))
      });
      this.dataService.getTmdbCast(this.filmObject).subscribe(castTmdb => {
        this.filmObject.castTmdb = castTmdb;
        console.log(this.filmObject.castTmdb);
        this.castTmdbCrew = this.filmObject.castTmdb.crew;
        this.castTmdbCrew = this.castTmdbCrew.filter(crew => crew.job === 'Director');
        this.castTmdbCrew.forEach(crew => this.directors.push({name: crew.name.trim()}));
        this.castTmdbCast = this.filmObject.castTmdb.cast;
        if (this.castTmdbCast.length >= 5) {
          for (let i = 0; i < 4; i++) {
            this.actors.push({name: this.castTmdbCast[i].name.trim()});
          }
        } else {
          for (let i = 0; i < this.castTmdbCast.length; i++) {
            this.actors.push({name: this.castTmdbCast[i].name.trim()});
          }
        }
        console.log(this.directors);
      });
    });
  }

}
