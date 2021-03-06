/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';

import App from './App';
// import App from './index.paper';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens';

enableScreens();

// 自定义后台任务
// import SomeTaskName from './src/task/SomeTaskName';
// const SomeTaskName = require('./src/task/SomeTaskName');
// AppRegistry.registerHeadlessTask('SomeTaskName', () => SomeTaskName);

AppRegistry.registerComponent(appName, () => App);
