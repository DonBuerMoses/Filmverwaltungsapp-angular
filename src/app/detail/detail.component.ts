import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {MovieObject} from "../types/movie-object";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Film} from "../types/film";
import {Cast, Crew} from "../types/cast-tmdb";
import {FilmeInfo} from "../types/filme-info";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface Chip {
  name: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
/**
 * Die DetailComponent ist eine Komponente, die eine Detailansicht für die Filme eines Nutzers bietet,
 * sowie die Möglichkeit diese wieder aus seiner Liste zu löschen
 */
export class DetailComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  directors: Chip[] = [];
  actors: Chip[] = [];
  genres: Chip[] = [];
  countries: Chip[] = [];
  languages: Chip[] = [];
  private _movieObject: MovieObject;
  private _filmeInfoObject: FilmeInfo;
  private _castTmdbCrew: Crew[];
  private _castTmdbCast: Cast[];
  film: Film;


  get movieObject(): MovieObject {
    return this._movieObject;
  }

  set movieObject(value: MovieObject) {
    this._movieObject = value;
  }

  get filmeInfoObject(): FilmeInfo {
    return this._filmeInfoObject;
  }

  set filmeInfoObject(value: FilmeInfo) {
    this._filmeInfoObject = value;
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

  /**
   * Konstruktor
   * @param dataService
   * @param route
   * @param _snackBar
   * @param router
   */
  constructor(public dataService: DataService, private route: ActivatedRoute, private _snackBar: MatSnackBar, private router: Router) { }

  /**
   * Wird bei Initialisierung der Komponente aufgerufen
   * Speichert alle Daten der Azure DB im movieObject Array
   */
  ngOnInit(): void {
    this.dataService.getAllData()
      .subscribe(movieObjects => {
          this.movieObject = movieObjects[0];
          console.log(this.movieObject);
        }
      );
    this.getFilm();
  }

  /**
   * Wird ausgelöst wenn der Button 'Bearbeiten' geklickt wird und gibt das in der Konsole aus
   */
  onEditFilmClick(): void {
    console.log('Film bearbeiten');
  }

  /**
   * löscht den Film aus der Liste, gibt das in einer Snackar aus und navigiert nach 3 Sekunden wieder zur Startseite zurück
   */
  onDeleteFilmClick(): void {
    console.log('Film löschen');
    this.dataService.getFilmOfNutzerById(String(this.route.snapshot.paramMap.get('email')), Number(this.route.snapshot.paramMap.get('id'))).subscribe(film => {
      this.film = film;
      this.dataService.deleteFilm(this.film).subscribe();
      this._snackBar.open("Film wurde aus der Liste gelöscht.", "So sei es");
      this.wait(3000);
      this.router.navigate(['films']);
      console.log('Film gelöscht')
    } );
  }

  /**
   * Holt die Filminformationen von den APIs mit der Email und der Email in der URL und befüllt damit das filmeInfoObject
   */
  getFilm(): void {
    console.log('getFilm:');
    const email = String(this.route.snapshot.paramMap.get('email'));
    console.log(email);
    const filmId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(filmId);

    this.dataService.getFilmeInfoOfNutzerById(email, filmId).subscribe(filmeInfoObject => {
      this.filmeInfoObject = filmeInfoObject;
      console.log(this.filmeInfoObject);
      this.dataService.getTmdbFilm(this.filmeInfoObject).subscribe(filmTmdb => {
        this.filmeInfoObject.filmTmdb = filmTmdb;
        console.log(this.filmeInfoObject.filmTmdb);
        this.filmeInfoObject.filmTmdb.genres.forEach(genre => this.genres.push({name: genre.name.trim()}))
        this.filmeInfoObject.filmTmdb.production_countries.forEach(country => this.countries.push({name: country.name.trim()}))
        this.filmeInfoObject.filmTmdb.spoken_languages.forEach(country => this.languages.push({name: country.english_name.trim()}))
      });
      this.dataService.getTmdbCast(this.filmeInfoObject).subscribe(castTmdb => {
        this.filmeInfoObject.castTmdb = castTmdb;
        console.log(this.filmeInfoObject.castTmdb);
        this.castTmdbCrew = this.filmeInfoObject.castTmdb.crew;
        this.castTmdbCrew = this.castTmdbCrew.filter(crew => crew.job === 'Director');
        this.castTmdbCrew.forEach(crew => this.directors.push({name: crew.name.trim()}));
        this.castTmdbCast = this.filmeInfoObject.castTmdb.cast;
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

  /**
   * wartet für den mitgegebenen Wert in Millisekunden.
   * @param ms Millisekunden, die gewartet wird
   */
  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }

}
