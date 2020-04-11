import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/Home';
import VideoWebView from './components/VideoWebView';

const App = createStackNavigator({
  Home: {
    path: '/',
    screen: HomeScreen,
  },
  Video: {
    path: 'video/:id',
    screen: VideoWebView,
  },
});

export default App;
