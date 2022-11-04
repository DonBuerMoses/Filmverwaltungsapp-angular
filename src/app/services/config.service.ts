import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovieObject} from "../types/movie-object";

@Injectable({
  providedIn: 'root'
})
/**
 * Service, der die Daten der config.json holt.
 */
export class ConfigService {

  constructor(private httpClient: HttpClient) { }

  getConfig(): Observable<MovieObject[]> {
    return this.httpClient.get<MovieObject[]>('./assets/config.json');
  }

  getConfigUserMovies(): Observable<MovieObject> {
    return this.httpClient.get<MovieObject>('./assets/config-user-movies.json');
  }
}


