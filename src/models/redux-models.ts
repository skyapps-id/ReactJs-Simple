export interface MovieModel {
  title: string;
  view: number;
  genre: string;
  descriptions: string;
}

export interface MoviesModel {
  all_movie: MovieModel[];
}
