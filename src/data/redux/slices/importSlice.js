import { createSlice } from '@reduxjs/toolkit';
import { DynamoConnector } from '../../DynamoConnector';

export const importSlice = createSlice({
  name: 'import',
  initialState: {
    current: '',
    loaded: [],
    isImporting: false,
    percentageLoaded: 0,
  },
  reducers: {
    setCurrentlyScanningCard: (state, action) => {
      state.current = action.payload;
    },
    setCards: (state, action) => {
      state.load = action.payload;
    },
    setIsImporting: (state, action) => {
      state.isImporting = action.payload;
    },
    setPercentageLoaded: (state, action) => {
      state.percentageLoaded = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentlyScanningCard, setCards, setIsImporting, setPercentageLoaded } = importSlice.actions;

export const importDeckList = (url) => (dispatch) => {
  console.log(`IMPORTING URL :: ${url}`);
  const doneCallback = (deck) => {
    //
  }

  const errorCallback = (error) => {
    dispatch(isImporting(false));
  }

  const statusCallback = (status) => {
    dispatch(setPercentageLoaded(status.percentage));
    dispatch(setCurrentlyScanningCard(status.card));
  }

  DynamoConnector.importDeckList(url, statusCallback, doneCallback, errorCallback);
}

// export const selectLeaderboardList = (state) => state.leaderboard.decks;

export default importSlice.reducer;
