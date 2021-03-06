import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeIconWithBadge from '../components/badge/HomeIconWithBadge';
import VideoList from '../pages/Video/VideoList';
import VideoDetail from '../pages/Video/VideoDetail';
import Github from '../pages/Profile/Github';
import Setting from '../pages/Profile/Setting';

import CategoryPage from '../pages/Category/CategoryList';
import Login from '../pages/User/Login';
import Register from '../pages/User/Register';
// import AuthPage from '../pages/Auth/AuthPage';
// import AuthSyncPage from '../pages/Auth/AuthSyncPage';
import SplashPageExample from '../pages/Splash/SplashPageExample';
import MineScene from '../pages/Mine/MineScene';
import Cart from '../pages/Cart/ShoppingCart';
// import Demo from '../pages/Animate/Book/Book2';
// import Demo from '../pages/Share/Demo';
import Demo from '../pages/Share/Demo2';

// import TabViewDemo from '../pages/TabView/Demo1';
// import DeviceDemo from '../pages/Device/Demo2';
// import ReaderDemo from '../pages/Reader/Demo2';
// import AnimateDemo from '../pages/Animate/Demo2';
// import HomeActionBar from '../pages/Modal/HomeActionBar';
// import LottieAnimatedExample from '../pages/Lottie/Official/LottieAnimatedExample';
// import SvgExample from '../pages/Svg/SvgExample';

let ProfileStack = createStackNavigator(
  {
    Profile: MineScene,
    Github: Github,
    Setting: Setting,
  },
  {
    initialRouteName: 'Profile',
  },
);

let VideoStack = createStackNavigator(
  {
    VideoList: VideoList,
    VideoDetail: VideoDetail,
  },
  {
    initialRouteName: 'VideoList',
  },
);

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Demo,
      navigationOptions: {
        tabBarLabel: '首页',
      },
    },
    Category: {
      screen: CategoryPage,
      navigationOptions: {
        tabBarLabel: '分类',
      },
    },
    Cart: {
      screen: Cart,
      navigationOptions: {
        tabBarLabel: '购物车',
      },
    },
    Settings: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: '设置',
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: '我的',
      },
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge;
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
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register,
});

const SwitchStack = createSwitchNavigator(
  {
    App: AppTabNavigator,
    Auth: AuthStack,
    Demo: Demo,
  },
  {
    initialRouteName: 'Demo',
  },
);

const SplashStack = createSwitchNavigator(
  {
    SplashPage: {
      screen: SplashPageExample,
      navigationOptions: {
        gesturesEnabled: true,
        headerTitle: null,
      },
    },
    SwitchPage: SwitchStack,
  },
  {
    mode: 'card',
    headerMode: 'none',
    initialRouteName: 'SplashPage',
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    }),
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default createAppContainer(SplashStack);
