import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  Image,
  View,
  Slider,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import Modal from 'react-native-modalbox';
import Toast from 'react-native-root-toast';
import LoadingSpinner from '../../components/loadingSpinner';

class SongItem extends React.Component {
  render() {
    let {data, rowID, t} = this.props;
    let current = t.state.currentSong === data;

    return (
      <TouchableOpacity
        onPress={() => {
          t.setState(
            {
              sliderValue: 0,
              current: '00:00',
              videoPause: false,
              playButton: 'pause-circle',
              currentSong: t.state.songs[rowID],
            },
            t.refs.modal.close(),
          );
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            alignItems: 'center',
            padding: 15,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={{color: current ? 'red' : 'black'}}>{data.name}</Text>
            <Text style={{fontSize: 11, color: current ? 'red' : '#AAA'}}>
              {' '}
              - {data.artists[0].name}
            </Text>
          </View>
          {current && <Icon name="play" size={12} color="red" />}
        </View>
      </TouchableOpacity>
    );
  }
}

export default class Music extends Component {
  constructor() {
    super();
    this.state = {
      songDS: [],
      songs: [],
      currentSong: {},
      sliderValue: 0,
      videoPause: false,
      playButton: 'pause-circle',
      current: '00:00',
    };
  }

  componentDidMount() {
    // 网易云音乐 云音乐热歌榜 api
    let url =
      'http://music.163.com/api/playlist/detail?id=3778678&updateTime=-1';
    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(res => {
        let songs = res.result.tracks;
        // 取前20首
        songs.length = 20;
        this.setState({
          songDS: songs,
          songs: songs,
          currentSong: songs[0],
        });
      });
  }

  _playButton() {
    this.setState({
      playButton: this.state.videoPause ? 'pause-circle' : 'play-circle',
      videoPause: !this.state.videoPause,
    });
  }

  _onProgress(data) {
    // currentTime 23.313s
    let val = parseInt(data.currentTime * 1000);
    this.setState({
      sliderValue: val,
      current: this._formatTime(Math.floor(data.currentTime)),
    });
  }

  _formatTime(time) {
    // 71s -> 01:11
    let min = Math.floor(time / 60);
    let second = time - min * 60;
    min = min >= 10 ? min : '0' + min;
    second = second >= 10 ? second : '0' + second;
    return min + ':' + second;
  }

  render() {
    if (!this.state.currentSong.name) {
      return <LoadingSpinner animating={true} />;
    }

    return (
      <View style={styles.container}>
        {this.state.songs.length != 0 ? (
          <Video
            source={{uri: this.state.currentSong.mp3Url}} // Can be a URL or a local file.
            ref={video => (this.video = video)} // Store reference
            rate={1.0} // 0 is paused, 1 is normal.
            volume={1.0} // 0 is muted, 1 is normal.
            muted={false} // Mutes the audio entirely.
            paused={this.state.videoPause} // Pauses playback entirely.
            repeat={false} // Repeat forever.
            playInBackground={false} // Audio continues to play when app entering background.
            playWhenInactive={false} // [iOS] Video continues to play when control or notification center are shown.
            progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
            onProgress={this._onProgress.bind(this)}
            onEnd={() => {
              let index = this.state.songs.indexOf(this.state.currentSong);
              index = index == this.state.songs.length - 1 ? 0 : index + 1;
              this.setState({
                currentSong: this.state.songs[index],
                sliderValue: 0,
                current: '00:00',
              });
            }}
            onError={e => {
              console.log(e);
              Toast.show('mp3资源出错', {
                position: Toast.positions.CENTER,
                onHidden: () => {
                  let index = this.state.songs.indexOf(this.state.currentSong);
                  index = index == this.state.songs.length - 1 ? 0 : index + 1;
                  this.setState({
                    currentSong: this.state.songs[index],
                    sliderValue: 0,
                    current: '00:00',
                  });
                },
              });
            }}
          />
        ) : null}

        <Image
          style={styles.image}
          source={{uri: this.state.currentSong.album.picUrl}}
          resizeMode="cover"
        />

        <View style={styles.playingInfo}>
          <Text>
            {this.state.currentSong.name} -{' '}
            {this.state.currentSong.artists[0].name}
          </Text>
          <Text>
            {this.state.current} -{' '}
            {this._formatTime(
              Math.floor(this.state.currentSong.duration / 1000),
            )}
          </Text>
        </View>
        <View style={styles.playingControl}>
          <TouchableOpacity onPress={this._playButton.bind(this)}>
            <Icon name={this.state.playButton} size={40} color="#FFDB42" />
          </TouchableOpacity>
          <Slider
            ref={slider => (this.slider = slider)}
            style={{flex: 1, marginLeft: 10, marginRight: 10}}
            value={this.state.sliderValue}
            onValueChange={value => {
              this.setState({
                videoPause: true,
                current: this._formatTime(Math.floor(value / 1000)),
              });
            }}
            onSlidingComplete={value => {
              this.video.seek(value / 1000);
              // 判断是否处于播放状态
              if (this.state.playButton === 'pause-circle') {
                this.setState({videoPause: false});
              }
            }}
            maximumValue={this.state.currentSong.duration}
            step={1}
            minimumTrackTintColor="#FFDB42"
          />
          <TouchableOpacity onPress={() => this.modal.open()}>
            <Icon name="list-ul" size={30} color="#FFDB42" />
          </TouchableOpacity>
        </View>

        <Modal style={styles.modal} position={'bottom'} ref="modal">
          <FlatList
            initialListSize={20}
            data={this.state.songDS}
            renderItem={({item: rowData, index: rowID}) => (
              <SongItem data={rowData} key={rowID} rowID={rowID} t={this} />
            )}
            ItemSeparatorComponent={() => {
              return <View style={{borderWidth: 0.3, borderColor: '#CCC'}} />;
            }}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'ios' ? 60 : 54,
    paddingBottom: 50,
  },
  image: {
    flex: 1,
  },
  playingControl: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  playingInfo: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    color: 'black',
    fontSize: 22,
  },
  modal: {
    height: 300,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingTop: 5,
    paddingBottom: 50,
  },
});
