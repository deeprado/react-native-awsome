import React from 'react';
import {Text, View, Image, TouchableHighlight} from 'react-native';
import moment from 'moment';
import styles from './styles';

moment.locale('zh-cn');

class VideoRow extends React.Component {
  static navigationOptions = {title: '视频新闻'};

  render() {
    let {video, navigation} = this.props;
    return (
      <View>
        <TouchableHighlight
          onPress={() => navigation.navigate('Video', {video: video})}>
          <View style={styles.row}>
            <Image
              source={{uri: video.thumbnails.default}}
              style={styles.cellImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {video.title}
              </Text>
              <Text style={styles.channel} numberOfLines={1}>
                {video.channelTitle} &bull;{' '}
                {moment(video.publishedAt).fromNow(true)} &bull;{' '}
                {video.stats.viewCount} 次浏览
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.cellBorder} />
      </View>
    );
  }
}

export default VideoRow;
