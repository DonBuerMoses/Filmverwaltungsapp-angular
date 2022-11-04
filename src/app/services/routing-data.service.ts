import { Injectable } from '@angular/core';
import {MovieObject} from "../types/movie-object";

@Injectable({
  providedIn: 'root'
})
export class RoutingDataService {

  private _routingData: MovieObject;
  constructor() { }


}
