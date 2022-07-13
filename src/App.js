import React from 'react';
import './App.css';
import { defaultTheme, Provider as ProviderV3 } from '@adobe/react-spectrum';
import FullHeight from 'react-full-height';
import { Provider } from 'react-redux';
import MainView from './components/main/MainViewContainer';
import store from './data/redux/store/AppStore';

class App extends React.Component {
  render() {
    return (
      <FullHeight className="App-body">
        <Provider store={store}>
          <ProviderV3 height="100%" width="100%" theme={defaultTheme} colorScheme="dark">
            <MainView />
          </ProviderV3>
        </Provider>
      </FullHeight>
    );
  }
}

export default App;
