import React from 'react';
import {Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import moment from 'moment';

import styles from './styles';

export default class VideoWebView extends React.Component {
  render() {
    const {video} = this.props.navigation.state.params;
    const pubDate = moment(video.publishedAt).fromNow(false);

    return (
      <View style={styles.container}>
        <Text style={[styles.noResultsText, styles.centerText]}>
          {pubDate} 通过 {video.channelTitle} | {video.stats.viewCount} 次浏览
        </Text>
        <WebView
          style={styles.frame}
          source={{
            // uri: `https://www.youtube.com/embed/${video.videoId}?autoplay=1`,
            uri: 'https://36kr.com/video/79538',
          }}
          renderLoading={this.renderLoading}
          renderError={this.renderError}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }

  renderLoading() {
    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noResultsText}>Loading video...</Text>
      </View>
    );
  }

  renderError() {
    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noResultsText}>
          Video not found - 404, {this.props.url}
        </Text>
      </View>
    );
  }
}
