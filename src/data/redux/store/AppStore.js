import { configureStore } from '@reduxjs/toolkit';
import leaderboardReducer from '../slices/leaderboardSlice';

export default configureStore({
  reducer: {
    leaderboard: leaderboardReducer,
  },
});
