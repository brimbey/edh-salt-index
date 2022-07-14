import { createSlice } from '@reduxjs/toolkit';
import { DynamoConnector } from '../../DynamoConnector';

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    decks: [],
    lastBatchLoaded: [],
    nextCursor: -1,
    isFetching: false,
  },
  reducers: {
    setLeaderboardItems: (state, action) => {
      state.decks = action.payload;
    },
    setNextCursor: (state, action) => {
      state.nextCursor = action.payload;
    },
    setLastBatchLoaded: (state, action) => {
      state.lastBatchLoaded = action?.payload?.items || [];
      state.nextCursor = action?.payload?.cursor || null;
      state.decks = state.decks.concat(action?.payload?.items);
      state.isFetching = false;
    },
    setLeaderboardIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    addNewDeckToLeaderboard: (state, action) => {
      state.decks.push(action.payload);

      // re-sort
      state.decks = state.decks.sort((a, b) => {
        return b?.salt - a?.salt;
      });
    }
  },
});

export const selectLeaderboardList = (state) => state.leaderboard.decks;
export const isLeaderboardFetching = (state) => state?.leaderboard?.isFetching || false;

// Action creators are generated for each case reducer function
export const { setLeaderboardItems, setNextCursor, setLastBatchLoaded, setLeaderboardIsFetching, addNewDeckToLeaderboard } = leaderboardSlice.actions;

export const fetchAll = (cursor) => (dispatch) => {
      cursor = cursor !== -1 ? cursor : null;

      cursor = cursor ? `${new URLSearchParams(cursor).toString()}` : null;

      dispatch(setLeaderboardIsFetching(true));

      DynamoConnector.getLeaderboard(
        cursor,
        (results) => {
          dispatch(setLastBatchLoaded({
            items: results.items,
            // cursor: results?.lastEvaluatedKey ? results.lastEvaluatedKey : null,
            cursor: results?.lastEvaluatedKey ? results.lastEvaluatedKey : null,
          }));
      });
};

export default leaderboardSlice.reducer;
