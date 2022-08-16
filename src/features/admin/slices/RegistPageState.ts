export interface IRegistSlice {
  loading: {
    detail: boolean;
    list: boolean;
  };

  getListParams: {
    pageNum: number;
    key: string;
    staatus: string;
    siGunGu: string;
    containMeditaion: boolean;
  };

  academy: {
    id: number;
    name: string;
    yogaSorts: {
      id: number;
      name: string;
    }[];
  };

  acadmies: {
    id: number;
    is_regist: boolean;
    naver_id: string;
    name: string;
    category: string;
    roadAddress: string;
    commonAddress: string;
    bookingUrl: string | null;
    phoneNum: string | null;
    bussinessHours: string | null;
    imageUrl: string | null;
    thumbUrl: string | null;
    x: string;
    y: string;
    yogaSorts: {
      id: number;
      name: string;
    }[];
  }[];

  total: number;

  deleteParams: number[];

  academyId: number;

  inputValue: string;

  iframeUrl: string;
}

export const registinitialState: IRegistSlice = {
  loading: {
    detail: false,
    list: false
  },
  getListParams: {
    pageNum: 1,
    key: '',
    staatus: '',
    siGunGu: '',
    containMeditaion: false
  },
  academy: {
    id: 0,
    name: '',
    yogaSorts: []
  },

  acadmies: [],

  total: 0,
  deleteParams: [],
  academyId: 0,
  inputValue: '',
  iframeUrl: ''
};
