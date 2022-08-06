import axios from 'axios';

export default class GoyoAPI {
  axios() {
    return axios.create({
      baseURL: 'http://localhost:8000'
    });
  }

  GETCategory(keyword: string) {
    return this.axios().get(`/yoga/category?keyword=${keyword}`);
  }
}
