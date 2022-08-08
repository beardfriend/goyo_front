import axios from 'axios';

export default class GoyoAPI {
  axios() {
    return axios.create({
      baseURL: 'http://localhost:8000/api'
    });
  }

  GETCategory(keyword: string) {
    return this.axios().get(`/yoga/category?keyword=${keyword}`);
  }

  GETList(keyword: string) {
    return this.axios().get(`/academy/list?yoga_sort=${keyword}`);
  }
}
