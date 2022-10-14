export interface Genres {
  id: number;
  name: string;
}
export interface GenreTmdb {
  genres?: (Genres)[] | null;
}
