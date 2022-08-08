import axios from 'axios';

export default class GoyoAPI {
  axios() {
    return axios.create({
      baseURL: 'http://118.67.135.60/api'
    });
  }

  GETCategory(keyword: string) {
    return this.axios().get(`/yoga/category?keyword=${keyword}`);
  }

  GETList(keyword: string, pageNum?: number) {
    return this.axios().get(
      `/academy/list?yoga_sort=${keyword}&page_no=${pageNum}`
    );
  }
}
