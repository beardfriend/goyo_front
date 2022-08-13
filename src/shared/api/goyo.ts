import axios from 'axios';

export default class GoyoAPI {
  axios() {
    return axios.create({
      baseURL:
        process.env.NODE_ENV === 'production'
          ? 'http://118.67.135.60/api'
          : 'http://localhost:8000/api'
    });
  }

  GETCategory(keyword: string) {
    return this.axios().get(`/v1/yoga/sorts?keyword=${keyword}`);
  }

  GETList(keyword: string, pageNum?: number) {
    return this.axios().get(
      `/v1/academy/list?yoga_sort=${keyword}&page_no=${pageNum}`
    );
  }

  // ADMIN
  GetAdminAcademies({
    pageNum,
    key,
    isRegist,
    siGunGu,
    ContainMeditation,
    BeforeTenMin
  }) {
    return this.axios().get(`/admin/academies`, {
      headers: {
        'X-API-Key': key || ''
      },
      params: {
        is_regist: isRegist,
        page_no: pageNum,
        si_gun_gu: siGunGu,
        contain_meditation: ContainMeditation,
        before_ten_min: BeforeTenMin
      }
    });
  }

  GetAdminiStrations() {
    return this.axios().get(`/admin/administrations`);
  }
}
