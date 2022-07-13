import { connect } from 'react-redux';
import { MainView } from './MainView';
import { fetchAll } from '../../data/redux/slices/leaderboardSlice';
import { importDeckList } from '../../data/redux/slices/importSlice';

const mapStateToProps = (state) => {
  const { byIds, allIds } = state.todos || {};
  const todos = allIds && allIds.length
    ? allIds.map((id) => (byIds ? { ...byIds[id], id } : null))
    : null;
  return { todos };
};

const mapDispatchToProps = (dispatch) => ({
  refreshLeaderboard() {
    dispatch(fetchAll());
  },
  importDeckList(uri) {
    dispatch(importDeckList(uri));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
