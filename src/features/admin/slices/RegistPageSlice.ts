import GoyoAPI from '@Shared/api/goyo';
import { registinitialState, IRegistSlice } from './RegistPageState';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@Apps/store';
import { AxiosResponse } from 'axios';
import { Status } from '@chakra-ui/react';

const goyo = new GoyoAPI();

export const GET_DETAIL = createAsyncThunk(
  `adminRegist/GET_DETAIL`,
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await goyo.GetDetail(id);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const GET_LIST = createAsyncThunk(
  `adminRegist/GET_LIST`,
  async (data: IRegistSlice['getListParams'], { rejectWithValue }) => {
    try {
      const res = await goyo.GetAdminAcademies(data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const GET_ADMINISTRATION = createAsyncThunk(
  `adminRegist/GET_ADMINISTRATION`,
  async (_, { rejectWithValue }) => {
    try {
      const res = await goyo.GetAdminiStrations();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const POST_YOGASORTS = createAsyncThunk(
  `adminRegist/POST_YOGASORTS`,
  async (
    {
      value,
      key
    }: {
      value: { naverPlaceId: number; name: string }[];
      key: IRegistSlice['getListParams']['key'];
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await goyo.PostYogaSorts({ value }, key);
      return res.status;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const DELETE_YOGASORTS = createAsyncThunk(
  `adminRegist/DELETE_YOGASORTS`,
  async (
    {
      idList,
      key
    }: {
      idList: string;
      key: IRegistSlice['getListParams']['key'];
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await goyo.DeleteYogaSorts(idList, key);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

export const adminRegistSlice = createSlice({
  name: 'adminRegist',
  initialState: registinitialState,
  reducers: {
    setAcademyId(state, action: PayloadAction<number>) {
      state.academyId = action.payload;
    },
    setGetListParams(
      state,
      action: PayloadAction<IRegistSlice['getListParams']>
    ) {
      state.getListParams = action.payload;
    },

    setIframeUrl(state, action: PayloadAction<string>) {
      state.iframeUrl = action.payload;
    },

    setTotal(state, action) {
      state.total = action.payload;
    },

    setDeleteParams(state, action) {
      if (action.payload === 0) {
        state.deleteParams = [];
        return;
      }
      if (state.deleteParams.includes(action.payload)) {
        const newData = state.deleteParams.filter(
          (data) => data != action.payload
        );
        state.deleteParams = newData;
      } else {
        state.deleteParams = [...state.deleteParams, action.payload];
      }
    },

    setInputValue(state, action) {
      state.inputValue = action.payload;
    }
  },
  extraReducers: {
    //DETAIL
    [GET_DETAIL.pending.type](state) {
      state.loading.detail = true;
    },
    [GET_DETAIL.fulfilled.type](
      state,
      action: PayloadAction<{ result: IRegistSlice['academy'] }>
    ) {
      state.loading.detail = false;
      state.academy = action.payload.result;
    },
    [GET_DETAIL.rejected.type](state) {
      state.loading.detail = false;
    },

    //LIST
    [GET_LIST.pending.type](state) {
      state.loading.list = true;
    },
    [GET_LIST.fulfilled.type](
      state,
      action: PayloadAction<{
        result: { list: IRegistSlice['acadmies']; total: number };
      }>
    ) {
      state.loading.list = false;
      state.total = action.payload.result.total;
      if (state.getListParams.pageNum === 1) {
        state.acadmies = action.payload.result.list;
        return;
      }
      for (let i = 0; i < action.payload.result.list.length; i++) {
        state.acadmies.push(action.payload.result.list[i]);
      }
    },
    [GET_LIST.rejected.type](state) {
      state.loading.list = false;
    },

    //Administration
    [GET_ADMINISTRATION.pending.type](state) {},

    [GET_ADMINISTRATION.fulfilled.type](state, action) {
      state.administrations = action.payload.result.list;
    },

    [GET_ADMINISTRATION.rejected.type](state) {},

    //POST YOGA SORTS

    [POST_YOGASORTS.pending.type](state) {
      state.loading.post = true;
    },
    [POST_YOGASORTS.fulfilled.type](
      state,
      action: PayloadAction<AxiosResponse<Status>>
    ) {
      state.loading.post = false;
    },
    [POST_YOGASORTS.rejected.type](state) {
      state.loading.post = false;
    },

    [DELETE_YOGASORTS.pending.type](state) {
      state.loading.delete = true;
    },

    [DELETE_YOGASORTS.fulfilled.type](state) {
      state.loading.delete = false;
    },

    [DELETE_YOGASORTS.rejected.type](state) {
      state.loading.delete = false;
    }
  }
});

export const {
  setAcademyId,
  setGetListParams,
  setIframeUrl,
  setTotal,
  setDeleteParams,
  setInputValue
} = adminRegistSlice.actions;

export const adminRegistState = (state: RootState) => state.adminRegist;

export default adminRegistSlice.reducer;
