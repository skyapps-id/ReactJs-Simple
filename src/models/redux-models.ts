export interface MovieModel {
  genre: string;
  title: string;
  views: number;
  descriptions: string;
}

export interface MoviesModel {
  all_movie: MovieModel[];
}
