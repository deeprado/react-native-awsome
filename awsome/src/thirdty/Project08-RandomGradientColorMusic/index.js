import React from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';

import GoBack from '../GoBack';
import autobind from 'autobind-decorator';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';

export const title = '08 - RandomGradientColorMusic';
export const description = '音乐随机背景渐变';

@autobind
class RandomGradientColorMusic extends React.Component {
  constructor() {
    super();
    this.state = {
      musicUrl: './Ecstasy.mp3',
      bgColor: this._randomColor(),
      colors: [
        'rgba(125, 125, 125, 0.2)',
        'rgba(255, 0, 0, 0.2)',
        'rgba(0, 255, 0, 0.2)',
        'rgba(0, 0, 255, 0.2)',
        'rgba(110, 110, 110, 0.2)',
      ],
    };
  }

  componentDidMount() {
    this._stop();
  }

  componentWillUnmount() {
    this._stop();
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.state.bgColor}]}>
        <LinearGradient
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 1.0}}
          locations={[0.1, 0.3, 0.5, 0.7, 0.9]}
          colors={this.state.colors}
          style={styles.linearGradient}>
          <TouchableHighlight
            onPress={() => this._onPlay()}
            underlayColor="transparent">
            <View style={styles.buttton}>
              <Icon name="ios-musical-note" color={'#ffffff'} size={50} />
            </View>
          </TouchableHighlight>
        </LinearGradient>
        <GoBack {...this.props} />
      </View>
    );
  }

  _onPlay() {
    clearInterval(this.timerID);

    this._playMusic();

    this.timerID = setInterval(() => {
      this.setState({
        bgColor: this._randomColor(),
      });
    }, 200);
  }

  _playMusic() {
    const self = this;

    if (!this.music) {
      this.music = new Sound('./Ecstasy.mp3', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
        } else {
          // loaded successfully
          console.log(
            'duration in seconds: ' +
              self.music._duration +
              'number of channels: ' +
              self.music._numberOfChannels,
          );
          // 无线循环播放
          self.music.setNumberOfLoops(-1).play();
        }
      });
    } else {
      this.music.play();
    }
  }

  _stop() {
    clearInterval(this.timerID);
    this.timerID = null;
    if (this.music) {
      this.music.release();
      this.music = null;
    }
  }

  _randomColor() {
    return `rgba(${this._randomColorValue()}, ${this._randomColorValue()}, ${this._randomColorValue()}, 1)`;
  }

  _randomColorValue() {
    return Math.floor(Math.random() * 256);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(256,256,256,0.2)',
  },
});

export default RandomGradientColorMusic;
