import { createSlice } from '@reduxjs/toolkit';

export const previewSlice = createSlice({
  name: 'preview',
  initialState: {
    isShowing: false,
    previewDeck: null,
  },
  reducers: {
    setPreviewDeck: (state, action) => {
      state.previewDeck = action.payload;
      state.isShowing = true;
    },
    setPreviewIsShowingFalse: (state) => {
      state.previewDeck = null;
      state.isShowing = false;
    }
  },
});

// Actions
export const { setPreviewDeck, setPreviewIsShowingFalse } = previewSlice.actions;

// Selectors
export const isPreviewShowing = (state) => state.preview.isShowing;

export default previewSlice.reducer;
