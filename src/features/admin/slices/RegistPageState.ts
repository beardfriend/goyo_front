import { UseToastOptions } from '@chakra-ui/react';

export interface IRegistSlice {
  loading: {
    detail: boolean;
    list: boolean;
    post: boolean;
    delete: boolean;
  };

  getListParams: {
    pageNum: number;
    key: string;
    status: string;
    siGunGu: string;
    containMeditation: boolean;
  };

  academy: {
    id: number;
    name: string;
    yogaSorts: {
      id: number;
      name: string;
    }[];
  };

  administrations: {
    si_gun_gu: string;
  }[];

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
    list: false,
    post: false,
    delete: false
  },
  getListParams: {
    pageNum: 1,
    key: '',
    status: '',
    siGunGu: '',
    containMeditation: false
  },

  academy: {
    id: 0,
    name: '',
    yogaSorts: []
  },

  administrations: [],

  acadmies: [],

  total: 0,
  deleteParams: [],
  academyId: 0,
  inputValue: '',
  iframeUrl: ''
};
