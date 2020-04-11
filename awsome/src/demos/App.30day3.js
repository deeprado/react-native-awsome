/**
 * 30 Days of React Native
 */
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ThreetyDaysofReactNative from '../thirdty/index';

import Project01 from '../thirdty/Project01-SimpleStopWatch';
import Project02 from '../thirdty/Project02-CustomFont';
import Project03 from '../thirdty/Project03-PlayLocalVideo';
import Project04 from '../thirdty/Project04-SnapChatMenu';
import Project05 from '../thirdty/Project05-CarouselEffect';
import Project06 from '../thirdty/Project06-FindMyLocation';
import Project07 from '../thirdty/Project07-PullToRefresh';
import Project08 from '../thirdty/Project08-RandomGradientColorMusic';
import Project09 from '../thirdty/Project09-ImageScroller';
import Project10 from '../thirdty/Project10-VideoBackground';
import Project11 from '../thirdty/Project11-ClearTableViewCell';
import Project12 from '../thirdty/Project12-LoginAnimation';
import Project13 from '../thirdty/Project13-AnimateTableViewCell';
import Project14 from '../thirdty/Project14-EmojiSlotMachine';
import Project15 from '../thirdty/Project15-AnimatedSplash';
import Project16 from '../thirdty/Project16-SlideMenu';
import Project17 from '../thirdty/Project17-TumblrMenu';
import Project18 from '../thirdty/Project18-LimitCharacters';
import VideoPlay from '../thirdty/Project03-PlayLocalVideo/VideoPlay';

import Login from '../thirdty/Project12-LoginAnimation/Login';

const routeConfigs = {
  Main: ThreetyDaysofReactNative,
  Project01: Project01,
  Project02: Project02,
  Project03: Project03,
  VideoPlay: VideoPlay,
  Project04: Project04,
  Project05: Project05,
  Project06: Project06,
  Project07: Project07,
  Project08: Project08,
  Project09: Project09,
  Project10: Project10,
  Project11: Project11,
  Project12: Project12,
  Login: Login,
  Project13: Project13,
  Project14: Project14,
  Project15: Project15,
  Project16: Project16,
  Project17: Project17,
  Project18: Project18,
};

const StackContainer = createStackNavigator(routeConfigs, {
  headerMode: 'none',
  initialRouteName: 'Main',
});

export default createAppContainer(StackContainer);
