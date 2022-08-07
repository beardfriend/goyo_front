import { RootState } from '@Apps/store';
import GoyoApi from '@Shared/api/goyo';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { academyinitialState } from './AcademyListPageState';

const goyo = new GoyoApi();
export const GET_CATEGORY = createAsyncThunk(
  `acadmey/GET_CATEGORY`,
  async (keyword: any, { rejectWithValue }) => {
    try {
      const res = await goyo.GETCategory(keyword);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const GET_LIST = createAsyncThunk(
  `academy/GET_LIST`,
  async (keyword: string, { rejectWithValue }) => {
    try {
      const res = await goyo.GETList(keyword);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const academySlice = createSlice({
  name: 'acadmey',
  initialState: academyinitialState,
  reducers: {
    setSearchKeyword(state, action) {
      state.category.query.keyword = action.payload;
    },
    setKeywordResponse(state, action) {
      state.category.responseData = action.payload;
    },
    setSearchListKeyword(state, action) {
      state.list.query.keyword = action.payload;
    }
  },
  extraReducers: {
    //
    [GET_CATEGORY.pending.type](state) {
      state.category.status.isLoading = true;
    },
    [GET_CATEGORY.fulfilled.type](state, action) {
      state.category.status.isLoading = false;
      state.category.responseData = action.payload.result;
    },
    [GET_CATEGORY.rejected.type](state) {
      state.category.status.isLoading = false;
    },
    //
    [GET_LIST.pending.type](state) {
      state.list.status.isLoading = true;
    },
    [GET_LIST.fulfilled.type](state, action) {
      state.category.status.isLoading = false;
      state.list.responseData = action.payload.result.list;
    },
    [GET_LIST.rejected.type](state) {
      state.list.status.isLoading = false;
    }
  }
});
export const categoryState = (state: RootState) => state.academy.category;
export const listState = (state: RootState) => state.academy.list;
export const { setSearchKeyword, setSearchListKeyword, setKeywordResponse } =
  academySlice.actions;

export default academySlice.reducer;
