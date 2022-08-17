import GoyoAPI from '@Shared/api/goyo';
import { registinitialState, IRegistSlice } from './RegistPageState';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@Apps/store';
import { useCookies } from 'react-cookie';

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
      if (state.deleteParams.includes(action.payload)) {
        const newData = state.deleteParams.filter(
          (data) => data != action.payload
        );
        state.deleteParams = newData;
      } else {
        state.deleteParams = [...state.deleteParams, action.payload];
      }
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
      state.acadmies = action.payload.result.list;
    },
    [GET_LIST.rejected.type](state) {
      state.loading.list = false;
    },

    //Administration
    [GET_ADMINISTRATION.pending.type](state) {},

    [GET_ADMINISTRATION.fulfilled.type](state, action) {
      state.administrations = action.payload.result.list;
    },

    [GET_ADMINISTRATION.rejected.type](state) {}
  }
});

export const {
  setAcademyId,
  setGetListParams,
  setIframeUrl,
  setTotal,
  setDeleteParams
} = adminRegistSlice.actions;

export const adminRegistState = (state: RootState) => state.adminRegist;

export default adminRegistSlice.reducer;
