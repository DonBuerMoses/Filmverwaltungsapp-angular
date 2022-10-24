import {FilmTmdb} from "./film-tmdb";
import {CastTmdb} from "./cast-tmdb";

export interface Film {
  film_ID: number;
  email: string;
  bewertung: number;
  favorit: boolean;
  speichermedien_id: number;
  filmTmdb?: FilmTmdb;
  castTmdb?: CastTmdb;
}
