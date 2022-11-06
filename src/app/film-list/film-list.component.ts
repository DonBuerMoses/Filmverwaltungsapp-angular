import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {MovieObject} from "../types/movie-object";
import {GenreTmdb} from "../types/genre-tmdb";
import {FilterObject} from "../types/filter-object";
import {FilmeInfo} from "../types/filme-info";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
/**
 * Die FilmList-Komponente stellt die Startseite der Applikation dar.
 * Hier werden Daten von der Azure DB und der TMDB geholt, gefiltert und an die Child-Komponenten weitergegeben.
 * Diese Seite dient der Darstellung der persönlichen Filmliste eines Nutzers
 */
export class FilmListComponent implements OnInit {
  viewSelected: string = 'picture';
  isLoading = true;
  aktiverNutzer: any;
  public movieObjects: MovieObject[];
  public userMovieObject: MovieObject;
  public nutzerFilmeInfos: FilmeInfo[];
  public filteredMovieObject: FilmeInfo[];
  public genreTmdb: GenreTmdb;
  private _filterObject: FilterObject = {
    suchbegriff: "",
    bewertung: [1, 5],
    dauer: [0, 210],
    genre: -1,
    jahr: [1900, 2022],
    speichermedium: -1,
    nurFavoriten: false
  };

  get filterObject(): FilterObject {
    return this._filterObject;
  }

  set filterObject(value: FilterObject) {
    this._filterObject = value;
    console.log("FilterObject:");
    console.log(this._filterObject);


    if (!!!this.nutzerFilmeInfos) {
      console.log("Data noch leer.");
    } else if (this.filterObject != undefined) {
      console.log("Data nicht leer.");
      this.filterMovieObject();
    } else {
      console.log("Data ist undefined.");
    }
  }


  /**
   * Konstruktor
   * @param dataService
   * @param token
   */
  constructor(private dataService: DataService, private token: TokenStorageService) { }

  /**
   * bei initialisierung der Komponente werden movieObjects, nutzerFilmeInfos und genreTmdb befüllt
   */
  ngOnInit(): void {
    if (this.token.getUser().email === undefined) {
      console.log("Nicht angemeldet.");
    } else {
      this.aktiverNutzer = this.token.getUser();
    }
    this.dataService.getAllData().subscribe(movieObjects => {
      this.movieObjects = movieObjects;
      //this.isLoading = false;
    });
    this.dataService.getFilmeInfosOfNutzer(this.aktiverNutzer.email).subscribe(filmeInfos => {
      this.nutzerFilmeInfos = filmeInfos;
      this.nutzerFilmeInfos.forEach((data, index) => {
        this.fillFilmTmdbList(data, index);
      });
      console.log('nutzerFilmeInfos init:');
      console.log(this.nutzerFilmeInfos);
      this.isLoading = false;
    });
    this.dataService.getTmdbGenres().subscribe( genreTmdb => {
      this.genreTmdb = genreTmdb;
      console.log(this.genreTmdb);
    })
  }

  /**
   * Dient dem wechseln der Ansicht zwischen Widgets und Tabelle
   * @param viewSelected
   */
  onViewSelectClick(viewSelected: string) {
    this.viewSelected = viewSelected;
    console.log(this.viewSelected);
  }

  /**
   * liefert ein MovieObject zurück, dass dem mitgegebenen datatype entspricht
   * @param datatype
   */
  getMovieObject(datatype: String): MovieObject {
    if(!!! this.movieObjects) {
      return undefined;
    }
    console.log("GetMovieObject: ");
    console.log(this.movieObjects);
    return this.movieObjects.filter(movieObject => movieObject.dataType === datatype)[0];
  }

  /**
   * gibt das userMovieObject zurück
   */
  getUserMovieObject(): MovieObject {
    if(!!! this.userMovieObject) {
      return undefined;
    }
    return this.userMovieObject;
  }

  /**
   * gibt das genreTmdb-Objekt zurück
   */
  getGenreTmdb(): GenreTmdb {
    if(!!! this.genreTmdb) {
      return undefined;
    }
    return this.genreTmdb;
  }

  /**
   * weisst dem filterObject den mitgegebenen Wert zu
   * @param $event
   */
  onSearchTextChanged($event: FilterObject) {
    this._filterObject = $event;
    console.log(this._filterObject);
  }

  /**
   * gibt das filterObject zurück
   */
  getFilter(): FilterObject {
    if(!!! this.filterObject) {
      return undefined;
    }
    return this.filterObject;
  }

  /**
   * befüllt das filmTmdb interface im nutzerFilmeInfos Objekt
   * @param data beinhaltet Daten vom Typ FilmInfos
   * @param index Index des Arrays
   */
  public fillFilmTmdbList(data: any, index: number) {

    this.dataService.getTmdbFilm(data).subscribe(filmTmdb => {
        this.nutzerFilmeInfos[index].filmTmdb = filmTmdb;
      }
    );
  }

  /**
   * dem filteredMovieObject wird der Wert von nutzerFilmeInfos zugewiesen. Anschließend wird das filteredMovieObject nach den Vorgaben im filterObject gefiltert.
   */
  filterMovieObject(): boolean {
    this.filteredMovieObject = this.nutzerFilmeInfos;

    if (this.filterObject.suchbegriff !== "") {
      this.filteredMovieObject = this.filteredMovieObject.filter(data => data.filmTmdb['title'].toLowerCase().indexOf(this._filterObject.suchbegriff.toLowerCase()) !== -1);
    }
    if (this._filterObject.bewertung[0] !== this._filterObject.bewertung[1]) {
      this.filteredMovieObject = this.filteredMovieObject.filter(data => data['bewertung'] >= this._filterObject.bewertung[0] && data['bewertung'] <= this._filterObject.bewertung[1]);
    } else {
      this.filteredMovieObject = this.filteredMovieObject.filter(data => data['bewertung'] === this._filterObject.bewertung[0]);
    }
    if (this._filterObject.dauer[0] !== this._filterObject.dauer[1]) {
      this.filteredMovieObject = this.filteredMovieObject.filter(data => {
        if (data.filmTmdb) {
          return data.filmTmdb['runtime'] >= this._filterObject.dauer[0] && data.filmTmdb['runtime'] <= this._filterObject.dauer[1];
        }
      });
    } else {
      this.filteredMovieObject = this.filteredMovieObject.filter(data => {
        if (data.filmTmdb) {
          return data.filmTmdb['runtime'] === this._filterObject.dauer[0];
        }
      });
    }
    if (this._filterObject.jahr[0] !== this._filterObject.jahr[1]) {
      this.filteredMovieObject = this.filteredMovieObject.filter(data => Date.parse(data.filmTmdb['release_date']) >= Date.parse(this._filterObject.jahr[0] + '-01-01') && Date.parse(data.filmTmdb['release_date']) <= Date.parse(this._filterObject.jahr[1] + '-12-31'));
    } else {
      this.filteredMovieObject = this.filteredMovieObject.filter(data => Date.parse(data.filmTmdb['release_date']) >= Date.parse(this._filterObject.jahr[0] + '01-01') && Date.parse(data.filmTmdb['release_date']) <= Date.parse(this._filterObject.jahr[0] + '12-31'));
    }
    if (this._filterObject.nurFavoriten) {
      this.filteredMovieObject = this.filteredMovieObject.filter(data => data['favorit'] === this._filterObject.nurFavoriten);
    }
    if (this.filterObject.genre !== -1) {
      this.filteredMovieObject = this.filteredMovieObject.filter(data => data.filmTmdb.genres.filter(genre => genre.id === this.filterObject.genre).length > 0);
    }
    if (this.filterObject.speichermedium !== -1) {
      this.filteredMovieObject = this.filteredMovieObject.filter(data => data.speichermedien_id === this.filterObject.speichermedium);
    }

    this.filteredMovieObject.sort((a,b) => (a.filmTmdb.title > b.filmTmdb.title) ? 1 : ((b.filmTmdb.title > a.filmTmdb.title) ? -1 : 0));
    console.log("FilteredMovieObject:");
    console.log(this.filteredMovieObject);
    return true;

  }
}
