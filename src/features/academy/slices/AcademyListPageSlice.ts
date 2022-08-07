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

export const academySlice = createSlice({
  name: 'acadmey',
  initialState: academyinitialState,
  reducers: {
    setSearchKeyword(state, action) {
      state.category.query.keyword = action.payload;
    }
  },
  extraReducers: {
    [GET_CATEGORY.pending.type](state) {
      state.category.status.isLoading = true;
    },
    [GET_CATEGORY.fulfilled.type](state, action) {
      state.category.status.isLoading = false;
      if (action.payload.result !== null) {
        state.category.data = action.payload.result;
      }
    },
    [GET_CATEGORY.rejected.type](state) {
      state.category.status.isLoading = false;
    }
  }
});
export const categoryState = (state: RootState) => state.academy.category;
export const { setSearchKeyword } = academySlice.actions;

export default academySlice.reducer;
