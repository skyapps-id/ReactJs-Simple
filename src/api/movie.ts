import { MovieModel } from '../models/redux-models';
import http from '../utils/http-common';

export default {
  async getAll() {
    const { data } = await http.get('/test-frontend/items.json');
    return data;
  },
  async update(id: string, payload: MovieModel) {
    const { data } = await http.put(`/test-frontend/items/${id}.json`, payload);
    return data;
  }
};
