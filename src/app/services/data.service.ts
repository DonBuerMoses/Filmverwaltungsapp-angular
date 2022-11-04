import {Injectable} from '@angular/core';
import {EMPTY, forkJoin, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {first, switchMap} from "rxjs/operators";
import {Film} from "../types/film";
import {MovieObject} from "../types/movie-object";
import {ConfigService} from "./config.service";
import {FilmTmdb} from "../types/film-tmdb";
import {CastTmdb} from "../types/cast-tmdb";
import {GenreTmdb} from "../types/genre-tmdb";
import {SearchTmdbObject} from "../types/search-film-tmdb-object";
import {Speichermedium} from "../types/speichermedium";
import {environment} from "../../environments/environment";
import {FilmeInfo} from "../types/filme-info";


@Injectable({
  providedIn: 'root'
})
/**
 * DataService bietet alle API aufrufe für sowohl die Azure DB als auch die TMDB
 */
export class DataService {
  backendURL = environment.backendURL;

  constructor(private http: HttpClient, private configService: ConfigService) {

  }

  public getData(endpoint: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.backendURL}/service/rest/${endpoint}`).pipe(
        first()
      );
  }

  public updateData(endpoint: string, id: any, data: any) {
    return this.http.put<any>(`${this.backendURL}/service/rest/${endpoint}/${id}`, data).pipe(
      first()
    );
  }

  public insertData(endpoint: string, data: any) {
    return this.http.post<any>(`${this.backendURL}/service/rest/${endpoint}`, data).pipe(
      first()
    );
  }

  public deleteData(endpoint: string, id: any) {
    return this.http.delete<any>(`${this.backendURL}/service/rest/${endpoint}/${id}`).pipe(
      first()
    );
  }

  public insertFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(`${this.backendURL}/service/rest/filme/`, film).pipe(
      first()
    );
  }

  public deleteFilm(film: Film): Observable<Film> {
    return this.http.delete<Film>(`${this.backendURL}/service/rest/filme/` + film.email + '/' + film.film_ID).pipe(
      first()
    );
  }

  public getFilmeOfNutzer(email: string): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.backendURL}/service/rest/filme/${email}`).pipe(
      first()
    );
  }

  public getFilmOfNutzerById(email: string, filmId: number): Observable<Film> {
    return this.http.get<Film>(`${this.backendURL}/service/rest/filme/${email}/${filmId}`).pipe(
      first()
    );
  }

  public getSpeichermedien(): Observable<Speichermedium[]> {
    return this.http.get<Speichermedium[]>(`${this.backendURL}/service/rest/speichermedien`).pipe(
      first()
    );
  }

  public getTmdbFilm(film: Film): Observable<FilmTmdb> {
    return this.http.get<FilmTmdb>(`https://api.themoviedb.org/3/movie/${film.film_ID}?api_key=f2aebac7438a1ceac8e3f17c500415b9`).pipe(
      first()
    );
  }

  public getTmdbCast(film: Film): Observable<CastTmdb> {
    return this.http.get<CastTmdb>(`https://api.themoviedb.org/3/movie/${film.film_ID}/credits?api_key=f2aebac7438a1ceac8e3f17c500415b9`).pipe(
      first()
    );
  }

  public getTmdbGenres(): Observable<GenreTmdb> {
    return this.http.get<GenreTmdb>(`https://api.themoviedb.org/3/genre/movie/list?api_key=f2aebac7438a1ceac8e3f17c500415b9`).pipe(
      first()
    );
  }

  public getTmdbFilmeByText(text: String, page: number): Observable<SearchTmdbObject> {
    return this.http.get<SearchTmdbObject>(`https://api.themoviedb.org/3/search/movie?api_key=f2aebac7438a1ceac8e3f17c500415b9&page=${page}&query=${text}`).pipe(
      first()
    );
  }

  public getFilmeInfosOfNutzer(email: string): Observable<FilmeInfo[]> {
    return this.http.get<FilmeInfo[]>(`${this.backendURL}/service/rest/filmeinfos/${email}`).pipe(
      first()
    );
  }

  public getFilmeInfoOfNutzerById(email: string, filmId: number): Observable<FilmeInfo> {
    return this.http.get<FilmeInfo>(`${this.backendURL}/service/rest/filmeinfos/${email}/${filmId}`).pipe(
      first()
    );
  }

  /**
   * Befüllt ein MovieObject-Array mit allen Daten die es durch getData bekommt.
   */
  public getAllData(): Observable<MovieObject[]> {
    return this.configService.getConfig()
      .pipe(
        switchMap(movieObjects => {
            const data$: Observable<any>[] = [
              of(movieObjects),
              ...movieObjects
                .map(movieObject => this.getData(movieObject.endpoint))
            ];

            return forkJoin(data$);
          }
        ),
        switchMap((dataList: any[]) => {
            const movieObjects = [...dataList[0]];
            dataList.slice(1).forEach((data, index) => {
                movieObjects[index].data = data;
              }
            );

            return of(movieObjects);
          }
        )
      );
  }
}
