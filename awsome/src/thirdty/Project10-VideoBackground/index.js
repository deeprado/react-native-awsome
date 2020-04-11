import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
  StatusBar,
} from 'react-native';

import autobind from 'autobind-decorator';
import Video from 'react-native-video';
import GoBack from '../GoBack';

const {width} = Dimensions.get('window');
const vw = width / 100;

export const title = '10 - VideoBackground';
export const description = '背景视频';

@autobind
class VideoBackground extends React.Component {
  constructor() {
    super();
    this.state = {
      // video: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4',
      video: require('./moments.mp4'),
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: false,
      controls: true,
      skin: 'native',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Video
          source={this.state.video}
          style={styles.fullScreen}
          resizeMode={this.state.resizeMode}
          repeat={true}
        />
        <View style={styles.titleContainer}>
          <Image
            style={styles.title}
            source={require('./images/login-secondary-logo.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight>
            <View style={[styles.button, styles.btnLogin]}>
              <Text style={styles.btnLoginText}>登录</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={[styles.button, styles.btnSignup]}>
              <Text style={styles.btnSignupText}>注册</Text>
            </View>
          </TouchableHighlight>
        </View>
        <GoBack {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  titleContainer: {
    width,
    position: 'absolute',
    left: 0,
    top: 60,
    alignItems: 'center',
  },
  title: {
    width: 80 * vw,
  },
  buttonContainer: {
    width,
    position: 'absolute',
    left: 0,
    bottom: 30,
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 320,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: 'green',
  },
  btnLoginText: {
    fontSize: 14,
    color: '#ffffff',
  },
  btnSignup: {
    backgroundColor: '#ffffff',
  },
  btnSignupText: {
    fontSize: 16,
    color: 'green',
  },
});

export default VideoBackground;
