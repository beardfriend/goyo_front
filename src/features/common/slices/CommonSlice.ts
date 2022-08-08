import { RootState } from './../../../apps/store';
import { createSlice } from '@reduxjs/toolkit';

const commonInitialState = {
  isMobile: false
};

export const commonSlice = createSlice({
  name: 'common',
  initialState: commonInitialState,
  reducers: {
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    }
  }
});
export const commonState = (state: RootState) => state.common;
export const { setIsMobile } = commonSlice.actions;

export default commonSlice.reducer;
