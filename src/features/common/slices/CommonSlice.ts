import { RootState } from './../../../apps/store';
import { createSlice } from '@reduxjs/toolkit';

const commonInitialState = {
  isMobile: false,
  fontSize: '10px',
  fullMode: false
};

export const commonSlice = createSlice({
  name: 'common',
  initialState: commonInitialState,
  reducers: {
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    },
    setFontsize(state, action) {
      state.fontSize = action.payload;
    },
    setFullMode(state, action) {
      state.fullMode = action.payload;
    }
  }
});
export const commonState = (state: RootState) => state.common;
export const { setIsMobile, setFontsize, setFullMode } = commonSlice.actions;

export default commonSlice.reducer;
