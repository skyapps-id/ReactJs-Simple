import { MovieModel } from '../models/redux-models';
import http from '../utils/http-common';

export default {
  async getAll() {
    const { data } = await http.get('/movies.json');
    return data;
  },
  async update(id: string, payload: MovieModel) {
    const { data } = await http.put(`/movies/${id}.json`, payload);
    return data;
  }
};
