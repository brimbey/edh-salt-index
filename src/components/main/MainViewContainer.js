import { connect } from 'react-redux';
import { MainView } from './MainView';
import { fetchAll } from '../../data/redux/slices/leaderboardSlice';
import { importDeckList, importPercentageDone, isImporting } from '../../data/redux/slices/importSlice';
import { isPreviewShowing } from '../../data/redux/slices/previewSlice';


const mapStateToProps = (state) => {
    const props = {};

    try {
        props.isImporting = isImporting(state);
        props.importPercentageDone = importPercentageDone(state);
        props.showPreview = isPreviewShowing(state);
    } catch (error) {
        // swallow error
    }
  

    return props;
};

const mapDispatchToProps = (dispatch) => ({
  refreshLeaderboard() {
    // dispatch(fetchAll());
  },
  importDeckList(uri) {
    dispatch(importDeckList(uri));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
