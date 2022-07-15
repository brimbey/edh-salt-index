import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    windowWidth: 0,
  },
  reducers: {
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    }
  },
});

// Actions
export const { setWindowWidth } = appSlice.actions;

// Selectors


export default appSlice.reducer;
