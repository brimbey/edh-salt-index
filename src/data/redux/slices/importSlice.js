import { createSlice } from '@reduxjs/toolkit';
import { DynamoConnector } from '../../DynamoConnector';
import { addNewDeckToLeaderboard, handleUpdatedDeck } from './leaderboardSlice';
import { setPreviewDeck } from './previewSlice';

export const importSlice = createSlice({
  name: 'import',
  initialState: {
    loaded: [],
    isImporting: false,
    isRefreshing: false,
    importing: {
      current: '',
      percentageLoaded: 0,
    },
    refreshing: {
      current: '',
      percentageLoaded: 0,
    }
  },
  reducers: {
    setIsImporting: (state, action) => {
      state.isImporting = action.payload;
    },
    setImportingCard: (state, action) => {
      state.importing.current = action.payload;
    },
    setImportingPercentage: (state, action) => {
      state.importing.percentageLoaded = action.payload;
    },
    setIsRefreshing: (state, action) => {
      state.isRefreshing = action.payload;
    },
    setRefreshingCard: (state, action) => {
      state.refreshing.current = action.payload;
    },
    setRefreshingPercentage: (state, action) => {
      state.refreshing.percentageLoaded = action.payload;
    },
  },
});

// Actions
export const importDeckList = (url) => (dispatch) => {
  dispatch(setIsImporting(true));
  DynamoConnector.importDeckList(url, 
    (status) => {
      dispatch(setImportingPercentage(status.percentage));
      dispatch(setImportingCard(status.card));
    }, 
    (deck) => {
      dispatch(setIsImporting(false));
      dispatch(setImportingPercentage(0));
      dispatch(addNewDeckToLeaderboard(deck));
      dispatch(setPreviewDeck(deck));
    }, 
    (error) => {
      dispatch(setIsImporting(false));
    });
}

export const doRefresh = (url) => (dispatch) => {
  dispatch(setIsRefreshing(true));
  DynamoConnector.importDeckList(url, 
    (status) => {
      dispatch(setRefreshingPercentage(status.percentage));
      dispatch(setRefreshingCard(status.card));
    }, 
    (deck) => {
      dispatch(setIsRefreshing(false));
      dispatch(setRefreshingPercentage(0));
      dispatch(handleUpdatedDeck(deck));
      dispatch(setPreviewDeck(deck));
    }, 
    (error) => {
      dispatch(setIsRefreshing(false));
    });
}

export const { setImportingCard, setCards, setIsImporting, setIsRefreshing, setRefreshingCard, setRefreshingPercentage, setImportingPercentage } = importSlice.actions;

// Selectors
export const isImporting = (state) => state.import.isImporting;
export const importPercentageDone = (state) => state.import.importing.percentageLoaded;

export default importSlice.reducer;
