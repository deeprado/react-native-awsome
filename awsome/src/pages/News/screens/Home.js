import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, ActivityIndicator} from 'react-native';

import log from '../lib/logger';
import styles from '../components/styles';
import VideoRow from '../components/VideoRow';

const BASE_URL = 'http://api.newsblock.io/api/';

const resultsCache = {
  dataForQuery: {},
  totalForQuery: {},
  timeForQuery: {},
};

class HomeScreen extends Component {
  static navigationOptions = {title: '新闻列表'};

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [
        {
          _id: 20,
          title: '终结美国40年“霸榜”，中国去年国际专利申请58990件',
          channelTitle: '36kr',
          thumbnails: {
            default:
              'https://img.36krcdn.com/20200404/v2_0afdc0bd60834766b3c9dbee007739e7_img_jpeg',
          },
          publishedAt: '2020-01-02',
          stats: {
            viewCount: 200,
          },
        },
        {
          _id: 20,
          title: '吉尼斯世界纪录是怎么诞生的？',
          channelTitle: '36kr',
          thumbnails: {
            default:
              'https://img.36krcdn.com/20200404/v2_0afdc0bd60834766b3c9dbee007739e7_img_jpeg',
          },
          publishedAt: '2020-01-02',
          stats: {
            viewCount: 200,
          },
        },
      ],
      filter: 'nation',
      error: null,
    };
  }

  componentDidMount() {
    // const _filter = this.props.filter || this.state.filter;
    // this.fetchVideos(_filter);
  }

  fetchVideos(query) {
    this.timeoutID = null;
    this.setState({
      isLoading: true,
      filter: query,
    });

    const expiry = 1 * 60 * 1000; // cache expiration
    if (resultsCache.timeForQuery[query] + expiry > new Date().getTime()) {
      this.setState({
        isLoading: false,
        data: resultsCache.dataForQuery[query],
      });
      return;
    }

    fetch(BASE_URL + query)
      .then(response => response.json())
      .then(responseData => {
        log('>>> fetched', BASE_URL + query);

        if (!responseData || !responseData.videos) {
          // abort when no videos
          log('### no responseData');
          return;
        }
        log('## fetched', responseData.videos.length, query);

        resultsCache.totalForQuery[query] = responseData.videos.length;
        resultsCache.dataForQuery[query] = responseData.videos;
        resultsCache.timeForQuery[query] = new Date().getTime();

        // console.log(resultsCache.dataForQuery[query].length,'dataForQuery', query);

        this.setState({
          isLoading: false,
          data: resultsCache.dataForQuery[query],
        });
      })
      .catch(error => {
        log('## error for: ' + query, error);
        const availableData = resultsCache.dataForQuery[query] || [];

        this.setState({
          data: availableData,
          isLoading: false,
        });
      })
      .done();
  }

  handleScroll(event) {
    if (event.nativeEvent.contentOffset.y < -110) {
      // pull-down
      this.setState({isLoading: true});
      const filter = this.props.filter || this.state.filter;
      // reduce dup fetches
      this.clearTimeout(this.timeoutID);
      this.timeoutID = this.setTimeout(() => this.fetchVideos(filter), 250);
    }
  }

  renderItem({item, index}) {
    let video = item;
    return (
      <VideoRow key={index} video={video} navigation={this.props.navigation} />
    );
  }

  onRenderItem(video) {
    this.renderItem(video);
  }

  renderHeader() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={this.state.isLoading}
            style={styles.marginTop}
          />
        </View>
      );
    }
  }

  render() {
    const keyExtractor = item => item._id;

    return (
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          data={this.state.data}
          keyExtractor={keyExtractor}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}

HomeScreen.defaultProps = {
  filter: 'cover',
  isLoading: true,
};

HomeScreen.propTypes = {
  filter: PropTypes.string,
  navigation: PropTypes.object,
  //   isLoading: PropTypes.boolean
};

export default HomeScreen;
