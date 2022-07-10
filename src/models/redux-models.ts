export interface MovieModel {
  title: string;
  views: number;
  genre: string;
  descriptions: string;
}

export interface MoviesModel {
  all_movie: MovieModel[];
}
