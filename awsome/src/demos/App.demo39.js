import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import Router from '../navigators/CustomNavigator';

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <Router />
      </View>
    );
  }
}
