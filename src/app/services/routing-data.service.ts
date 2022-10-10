import { Injectable } from '@angular/core';
import {MovieObject} from "../types/movie-object";

@Injectable({
  providedIn: 'root'
})
export class RoutingDataService {

  private _routingData: MovieObject;

  get routingData(): MovieObject {
    return this._routingData;
  }

  set routingData(value: MovieObject) {
    this._routingData = value;
  }

  constructor() { }


}
