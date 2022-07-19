import { connect } from 'react-redux';
import { MainView } from './MainView';
import { initializeLeaderBoard } from '../../data/redux/slices/leaderboardSlice';
import { importDeckList, importPercentageDone, isImporting } from '../../data/redux/slices/importSlice';
import { isPreviewShowing } from '../../data/redux/slices/previewSlice';
import { setIsMobile } from '../../data/redux/slices/appSlice';


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
  initializeApp(isMobile) {
    dispatch(setIsMobile(isMobile));
  },
  refreshLeaderboard() {
    dispatch(initializeLeaderBoard());
  },
  importDeckList(uri) {
    dispatch(importDeckList(uri));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
