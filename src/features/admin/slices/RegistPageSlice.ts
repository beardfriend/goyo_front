import GoyoAPI from '@Shared/api/goyo';
import { registinitialState, IRegistSlice } from './RegistPageState';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@Apps/store';

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

export const adminRegistSlice = createSlice({
  name: 'adminRegist',
  initialState: registinitialState,
  reducers: {
    setAcademyId(state, action: PayloadAction<number>) {
      state.academyId = action.payload;
    }
  },
  extraReducers: {
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
    }
  }
});

export const { setAcademyId } = adminRegistSlice.actions;

export const adminRegistState = (state: RootState) => state.adminRegist;

export default adminRegistSlice.reducer;
