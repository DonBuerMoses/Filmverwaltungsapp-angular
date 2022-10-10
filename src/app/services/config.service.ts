import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovieObject} from "../types/movie-object";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private httpClient: HttpClient) { }

  getConfig(): Observable<MovieObject[]> {
    return this.httpClient.get<MovieObject[]>('./assets/config.json');
  }
}


