'use strict';

import React from 'react';
import {Easing, Animated} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import FirstPage from '../pages/Test/FirstPage';
import SecondPage from '../pages/Test/SecondPage';

// import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

const RouteConfigs = {
  FirstPage: {screen: FirstPage},
  SecondPage: {screen: SecondPage},
};

const TransitionConfiguration = () => ({
  screenInterpolator: sceneProps => {
    const {scene} = sceneProps;
    const {route} = scene;
    const params = route.params || {};
    const routeName = sceneProps.scene.route.routeName;
    const transition = params.transition || 'forHorizontal';
    if (routeName === 'SecondPage') {
      return null;
    }
    return StackViewStyleInterpolator[transition](sceneProps);
  },
  transitionSpec: {
    duration: 350,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
});

const StackNavigatorConfig = {
  initialRouteName: 'FirstPage',
  headerMode: 'screen',
  mode: 'card',
  transitionConfig: TransitionConfiguration,
};

const Navigator = createStackNavigator(RouteConfigs, StackNavigatorConfig);

const defaultStateAction = Navigator.router.getStateForAction;

Navigator.router.getStateForAction = (action, state) => {
  if (state && action.key && action.type === 'Navigation/BACK') {
    const desiredRoute = state.routes.find(
      route => route.routeName === action.key,
    );
    if (desiredRoute) {
      const index = state.routes.indexOf(desiredRoute);
      const finalState = {
        ...state,
        routes: state.routes.slice(0, index + 1),
        index: index,
      };
      return finalState;
    } else {
      if (state.routes.length > action.key) {
        const stacksLength = state.routes.length - action.key;
        const stacks = state.routes.slice(0, stacksLength);
        const finalState = {
          ...state,
          routes: stacks,
          index: stacksLength - 1,
        };
        return finalState;
      }
    }
  }
  return defaultStateAction(action, state);
};

const AppContainer = createAppContainer(Navigator);

export default AppContainer;
