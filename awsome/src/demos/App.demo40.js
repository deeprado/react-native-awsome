import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Zhuifu from '../pages/Zhihu/Posts';
import Wechat from '../pages/Wechat';
import Weather from '../pages/Weather';
import Netinfo from '../pages/Netinfo/Demo1';
import News from '../pages/News';
import Iflytek from '../pages/Iflytek/Demo';
import Echart from '../pages/Echart/Demo1';

const AppTabNavigator = createBottomTabNavigator(
  {
    // Zhuifu: {
    //   screen: Zhuifu,
    //   navigationOptions: {
    //     tabBarLabel: '知乎',
    //   },
    // },
    Wechat: {
      screen: Wechat,
      navigationOptions: {
        tabBarLabel: '微信',
      },
    },
    Weather: {
      screen: Weather,
      navigationOptions: {
        tabBarLabel: '天气',
      },
    },
    Netinfo: {
      screen: Netinfo,
      navigationOptions: {
        tabBarLabel: '网络',
      },
    },
    News: {
      screen: News,
      navigationOptions: {
        tabBarLabel: '新闻',
      },
    },
    Iflytek: {
      screen: Iflytek,
      navigationOptions: {
        tabBarLabel: '语音',
      },
    },
    Echart: {
      screen: Echart,
      navigationOptions: {
        tabBarLabel: '图表',
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
        } else if (routeName === 'Cart') {
          iconName = `ios-cart`;
        } else if (routeName === 'Category') {
          iconName = `ios-basketball`;
        } else if (routeName === 'Profile') {
          iconName = `ios-alarm`;
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const AppContainer = createAppContainer(AppTabNavigator);

export default AppContainer;
