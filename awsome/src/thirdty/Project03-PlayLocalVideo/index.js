import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
  FlatList,
} from 'react-native';

import autobind from 'autobind-decorator';
import GoBack from '../GoBack';

const {width} = Dimensions.get('window');

const videos = [
  {
    image: require('./images/videoScreenshot01.png'),
    video: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4',
    title: 'Introduce 3DS Mario',
    source: 'Youtube - 06:32',
  },
  {
    image: require('./images/videoScreenshot02.png'),
    video: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4',
    title: 'Emoji Among Us',
    source: 'Vimeo - 3:34',
  },
  {
    image: require('./images/videoScreenshot03.png'),
    video: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4',
    title: 'Seals Documentary',
    source: 'Vine - 00:06',
  },
  {
    image: require('./images/videoScreenshot04.png'),
    video: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4',
    title: 'Adventure Time',
    source: 'Youtube - 02:39',
  },
  {
    image: require('./images/videoScreenshot05.png'),
    video: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4',
    title: 'Facebook HQ',
    source: 'Facebook - 10:20',
  },
  {
    image: require('./images/videoScreenshot06.png'),
    video: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4',
    title: 'Lijiang Lugu Lake',
    source: 'Allen - 20:30',
  },
];

export const title = '03 - PlayLocalVideo';
export const description = '播放本地视频';
class PlayLocalVideo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VideoList {...this.props} />
        <GoBack {...this.props} />
      </View>
    );
  }
}

@autobind
class VideoList extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: videos,
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
      </View>
    );
  }

  _renderItem({item: rowData, index: rowID}) {
    return (
      <View key={rowID} style={styles.itemContainer}>
        <TouchableHighlight onPress={() => this._playVideo(rowData)}>
          <View
            style={{
              flex: 1,
            }}>
            <ImageBackground source={rowData.image} style={styles.image}>
              <Image
                style={styles.playBtn}
                source={require('./images/playBtn.png')}
              />
            </ImageBackground>
            <View style={styles.textContainer}>
              <Text style={styles.imageTitle}>{rowData.title}</Text>
              <Text style={styles.imageTime}>{rowData.source}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _playVideo(rowData) {
    this.props.navigation.navigate('VideoPlay', {
      title: rowData.title,
      video: rowData.video,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  itemContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtn: {},
  textContainer: {
    width,
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageTitle: {
    fontFamily: 'Avenir Next',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 18,
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
  imageTime: {
    color: '#999999',
  },
});

export default PlayLocalVideo;
