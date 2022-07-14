import { configureStore } from '@reduxjs/toolkit';
import leaderboardReducer from '../slices/leaderboardSlice';
import importReducer from '../slices/importSlice';
import previewReducer from '../slices/previewSlice';
import appReducer from '../slices/appSlice';

export default configureStore({
  reducer: {
    leaderboard: leaderboardReducer,
    import: importReducer,
    preview: previewReducer,
    app: appReducer,
  },
});
