import {FilmTmdb} from "./film-tmdb";
import {CastTmdb} from "./cast-tmdb";

export interface FilmeInfo {
  film_ID: number;
  email: string;
  bewertung: number;
  favorit: boolean;
  speichermedien_id: number;
  speichermedium: string;
  filmTmdb?: FilmTmdb;
  castTmdb?: CastTmdb;
}
