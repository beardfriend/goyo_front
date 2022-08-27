import { RootState } from '@Apps/store';
import { createSlice } from '@reduxjs/toolkit';
import { academySearchInitialState } from './AcademySearchPageState';

export const academySearchSlice = createSlice({
  name: 'academySearch',
  initialState: academySearchInitialState,
  reducers: {
    setInputFocus(state, action) {
      state.isFocus = action.payload;
    }
  }
});

export const academySearchState = (state: RootState) => state.academySearch;

export const { setInputFocus } = academySearchSlice.actions;

export default academySearchSlice.reducer;
