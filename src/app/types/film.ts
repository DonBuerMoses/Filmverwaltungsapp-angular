import {FilmTmdb} from "./film-tmdb";

export interface Film {
  film_ID: number;
  email: string;
  bewertung: number;
  favorit: boolean;
  speichermedien_id: number;
  filmTmdb: FilmTmdb;
}
