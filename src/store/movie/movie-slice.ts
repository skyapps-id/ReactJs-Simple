import { MovieModel, MoviesModel } from '../../models/redux-models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initMovie: MoviesModel = {
  all_movie: []
};

const movieSlice = createSlice({
  name: 'movie',
  initialState: initMovie,
  reducers: {
    setMovies(state, action: PayloadAction<MovieModel[]>) {
      state.all_movie = action.payload;
    }
  }
});
export default movieSlice;
