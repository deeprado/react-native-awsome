import React from 'react';
import {StyleSheet, View, Text, Alert, TouchableOpacity} from 'react-native';

import Video from 'react-native-video';
import autobind from 'autobind-decorator';
import GoBack from '../GoBack';

@autobind
class VideoPlay extends React.Component {
  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    console.log('params', params);
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: false,
      controls: true,
      skin: 'native',
      title: props.title ? props.title : params.title,
      video: props.video ? props.video : params.video,
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.controls
          ? this._renderNativeSkin()
          : this._renderCustomSkin()}
        <GoBack {...this.props} />
      </View>
    );
  }

  _renderCustomSkin() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.videoContainer}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => {
            this.setState({paused: !this.state.paused});
          }}>
          <Video
            source={{uri: this.state.video}}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={() => {
              Alert.alert('Done!');
            }}
            repeat={true}
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {this._renderSkinControl('custom')}
              {this._renderSkinControl('native')}
              {this._renderSkinControl('embed')}
            </View>
          </View>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this._renderRateControl(0.5)}
              {this._renderRateControl(1.0)}
              {this._renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {this._renderVolumeControl(0.5)}
              {this._renderVolumeControl(1)}
              {this._renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {this._renderResizeModeControl('cover')}
              {this._renderResizeModeControl('contain')}
              {this._renderResizeModeControl('stretch')}
            </View>
          </View>

          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View
                style={[styles.innerProgressCompleted, {flex: flexCompleted}]}
              />
              <View
                style={[styles.innerProgressRemaining, {flex: flexRemaining}]}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  _renderNativeSkin() {
    const videoStyle =
      this.state.skin === 'embed'
        ? styles.nativeVideoControls
        : styles.fullScreen;

    return (
      <View style={styles.videoContainer}>
        <View style={styles.fullScreen}>
          <Video
            source={{uri: this.state.video}}
            style={videoStyle}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={() => {
              Alert.alert('Done!');
            }}
            repeat={true}
            controls={this.state.controls}
          />
        </View>
        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {this._renderSkinControl('custom')}
              {this._renderSkinControl('native')}
              {this._renderSkinControl('embed')}
            </View>
          </View>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {this._renderRateControl(0.5)}
              {this._renderRateControl(1.0)}
              {this._renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {this._renderVolumeControl(0.5)}
              {this._renderVolumeControl(1)}
              {this._renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {this._renderResizeModeControl('cover')}
              {this._renderResizeModeControl('contain')}
              {this._renderResizeModeControl('stretch')}
            </View>
          </View>
        </View>
      </View>
    );
  }

  onLoad(data) {
    this.setState({duration: data.duration});
  }

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return (
        parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
      );
    } else {
      return 0;
    }
  }

  _renderSkinControl(skin) {
    const isSelected = this.state.skin === skin;
    const selectControls = skin === 'native' || skin === 'embed';
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            controls: selectControls,
            skin: skin,
          });
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {skin}
        </Text>
      </TouchableOpacity>
    );
  }

  _renderRateControl(rate) {
    const isSelected = this.state.rate === rate;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({rate: rate});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  }

  _renderResizeModeControl(resizeMode) {
    const isSelected = this.state.resizeMode === resizeMode;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({resizeMode: resizeMode});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    );
  }

  _renderVolumeControl(volume) {
    const isSelected = this.state.volume === volume;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({volume: volume});
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300,
  },
});

export default VideoPlay;
