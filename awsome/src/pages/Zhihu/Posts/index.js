'use strict';

import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
} from 'react-native';

import PostCellView from './PostCellView';
import PostDetailView from '../PostDetail/PostDetailView';

const REQUEST_URL =
  'http://zhuanlan.zhihu.com/api/columns/pinapps/posts?limit=10&offset=';

const logoPng = require('../../../assets/image/logo.png');

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          title: 'afsa',
          titleImage: logoPng,
          publishedTime: '2020-01-02 22:22:22',
        },
      ],
      responseData: [],
      loaded: true,
      pageOffset: 0,
      loading: false,
    };
    this.loadMore = this.loadMore.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  /**
   * component 渲染后加载数据
   */
  componentDidMount() {
    // this.initData();
  }

  initData() {
    this.fetchData(REQUEST_URL + this.state.pageOffset * 10);
  }
  /**
   * 加载数据
   * @param url
   */
  fetchData(url) {
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(
        function(responseData) {
          var data = this.state.responseData.concat(responseData);
          this.setState({
            dataSource: data,
            loaded: true,
            responseData: data,
            pageOffset: ++this.state.pageOffset,
            loading: false,
          });
        }.bind(this),
      )
      .done();
  }

  /**
   * 渲染方法
   * @returns {XML}
   */
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderList}
          style={styles.listView}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }

  /**
   * 页面进来的时候加载 loading
   * @returns {XML}
   */
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>加载知乎中...</Text>
      </View>
    );
  }

  /**
   * 滚动到底部的时候加载更多
   */
  endReached() {
    this.fetchData(REQUEST_URL + this.state.pageOffset * 10);
  }

  /**
   * 加载更多
   */
  loadMore() {
    // this.setState({
    //   loading: true,
    // });
    // this.fetchData(REQUEST_URL + this.state.pageOffset * 10);
  }

  /**
   * 底部视图
   * @returns {XML}
   */
  renderFooter() {
    return (
      <TouchableHighlight underlayColor="#fff">
        <View style={styles.containerFooter}>
          {this.state.loading ? (
            <Image
              source={{
                uri:
                  'http://s6.mogucdn.com/pic/140813/kuw9n_ieyggojrmi4dknlbmiytambqgiyde_26x26.gif',
              }}
              style={{width: 26, height: 26, flex: 1, marginLeft: -80}}
            />
          ) : (
            <Text style={styles.loadeMoreBtn}>点击加载更多...</Text>
          )}
        </View>
      </TouchableHighlight>
    );
  }

  /**
   * 开始加载列表
   * @param post
   * @returns {XML}
   */
  renderList({item, index}) {
    let post = item;
    return (
      <PostCellView
        key={index}
        onSelect={() => this.renderDetail(post)}
        post={post}
      />
    );
  }

  /**
   * 点击跳转到 post 详情页
   * @param post
   */
  renderDetail(post) {
    this.props.navigator.push({
      title: post.title,
      component: PostDetailView,
      passProps: {slug: post.slug},
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  listView: {
    paddingBottom: 20,
  },

  loadingText: {
    marginTop: 100,
    textAlign: 'center',
    flex: 1,
  },

  containerFooter: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
  },

  loadeMoreBtn: {
    textAlign: 'center',
    flex: 1,
    color: '#f34943',
    fontSize: 14,
    marginTop: 5,
  },
});

export default Posts;
