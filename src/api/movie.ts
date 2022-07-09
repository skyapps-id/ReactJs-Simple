import http from '../utils/http-common';

export default {
  async getAll() {
    const { data } = await http.get('/test-frontend/items.json');
    return data;
  }
};
