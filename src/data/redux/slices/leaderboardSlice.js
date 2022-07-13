import { createSlice } from '@reduxjs/toolkit';
import { DynamoConnector } from '../../DynamoConnector';

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    decks: [],
  },
  reducers: {
    setLeaderboardItems: (state, action) => {
      state.decks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLeaderboardItems } = leaderboardSlice.actions;

export const fetchAll = () => (dispatch) => {
  DynamoConnector.getLeaderboard((decks) => {
    dispatch(setLeaderboardItems(decks));
  });
};

export const selectLeaderboardList = (state) => state.leaderboard.decks;

export default leaderboardSlice.reducer;
