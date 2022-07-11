import movieSlice from './movie-slice';
import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { MovieModel } from '../../models/redux-models';
import MovieService from '../../api/movie';

export const movieActions = movieSlice.actions;

export const fetchMovies = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response: MovieModel[] = await MovieService.getAll();
    dispatch(movieActions.setMovies(response));
  };
};

export const updateMovie = (
  id: string,
  payload: MovieModel
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async () => {
    await MovieService.update(id, payload);
  };
};
