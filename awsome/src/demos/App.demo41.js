import React from 'react';
import {Provider} from 'react-redux';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import configStore from '../app/store/store';

import Slider from '../app/slider';
import Tab from '../app/home/home';

const store = configStore();

const stackContainer = createStackNavigator({
  Slider: Slider,
  Tab: Tab,
});
const AppContainer = createAppContainer(stackContainer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
