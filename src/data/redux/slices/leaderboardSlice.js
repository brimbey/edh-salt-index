import { createSlice } from '@reduxjs/toolkit';
import { DynamoConnector } from '../../DynamoConnector';
// import store from '../store/AppStore';




export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    listItems: [],
    lastBatchLoaded: [],
    nextCursor: -1,
    isFetching: false,
    isUpdate: false,
    forceLoad: false,
    __INTERNAL_DISPATCH: null,
  },
  reducers: {
    setLeaderboardItems: (state, action) => {
      state.listItems = action.payload;
    },
    setNextCursor: (state, action) => {
      state.nextCursor = action.payload;
    },
    setLastBatchLoaded: (state, action) => {
      const { items, cursor, type } = action.payload;
      
      state.lastBatchLoaded = items?.map((item) => {
        return {
          ...item,
          key: item.id,
        }
      }) || [];
      
      state.nextCursor = cursor || null;
      state.listItems = state.listItems.concat(action?.payload?.items);
      state.isFetching = false;
      state.forceLoad = type === 'new' || type == 'update';
      state.isUpdate = type === 'update';
    },
    __INTERNAL_SET_DISPATCH: (state, action) => {
      state.__INTERNAL_DISPATCH = action.payload;
    },
    setLeaderboardIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setForceLoad: (state, action) => {
      state.forceLoad = action.payload;
    },
    setIsUpdate: (state, action) => {
      state.isUpdate = action.payload;
    }
  },
});

const prettyPrintJSON = (json) => {
  console.log(`${JSON.stringify(json, null, 4)}`);
}

export const { __INTERNAL_SET_DISPATCH } = leaderboardSlice.actions;

export const selectLeaderboardList = (state) => state?.leaderboard?.listItems || [];
export const isLeaderboardFetching = (state) => state?.leaderboard?.isFetching || false;
export const getNextCursor = (state) => state?.leaderboard?.nextCursor || null;

export const getLeaderboardList = (state) => { 
  return {
    initialSortDescriptor: {
      column: 'salt',
      direction: 'descending',
    },
    async load({ signal, cursor }) {
      if (state?.leaderboard === undefined || state === undefined || state == null) {
        return {
          items: [],
          cursor: null,
        };
      } else {
        const { lastBatchLoaded, nextCursor, listItems, isFetching } = state.leaderboard;
        const dispatch = state?.leaderboard?.__INTERNAL_DISPATCH;
        cursor = nextCursor;

        if (isFetching) {
          return;
        } else {
          try {
            if (nextCursor && dispatch) {
                dispatch(fetchAll(nextCursor));
                return {
                  items: lastBatchLoaded,
                  cursor: nextCursor,
                };
            }
          } catch (e) {
            // console.log(`ERROR ${e}`);
          }
        }
        
        return {
          items: lastBatchLoaded,
          cursor: nextCursor,
        };
      }
    },
    async sort(inputObject) {
      return {
        items: inputObject?.items?.sort((a, b) => {
          return parseFloat(b?.salt) - parseFloat(a?.salt);
        })
      };
    }
  };
}

// Action creators are generated for each case reducer function
export const { setLeaderboardItems, setNextCursor, setLastBatchLoaded, setLeaderboardIsFetching, setForceLoad, setIsUpdate } = leaderboardSlice.actions;

export const initializeLeaderBoard = () => (dispatch) => {
  dispatch(__INTERNAL_SET_DISPATCH(dispatch));
}

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
            type: null,
          }));
      });
};

export const addNewDeckToLeaderboard = (deck) => (dispatch) => {
  dispatch(setLastBatchLoaded({
    items: [ deck ],
    // cursor: results?.lastEvaluatedKey ? results.lastEvaluatedKey : null,
    cursor: getNextCursor(),
    type: 'new',
  }));
}

export const handleUpdatedDeck = (deck) => (dispatch) => {
  dispatch(setLastBatchLoaded({
    items: [ deck ],
    // cursor: results?.lastEvaluatedKey ? results.lastEvaluatedKey : null,
    cursor: getNextCursor(),
    type: 'update',
  }));
}

export default leaderboardSlice.reducer;
