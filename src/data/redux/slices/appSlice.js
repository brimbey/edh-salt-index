import { createSlice } from '@reduxjs/toolkit';

export const previewSlice = createSlice({
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
export const { setWindowWidth } = previewSlice.actions;

// Selectors


export default app.reducer;
