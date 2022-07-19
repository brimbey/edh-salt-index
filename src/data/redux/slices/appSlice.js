import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    windowWidth: 0,
    isMobile: false,
  },
  reducers: {
    setWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
    setIsMobile: (state, action) => {
      console.log(`setting is mobile :: ${action.payload}`);
      state.isMobile = action.payload;
    }
  },
});

// Actions
export const { setWindowWidth, setIsMobile } = appSlice.actions;

// Selectors


export default appSlice.reducer;
