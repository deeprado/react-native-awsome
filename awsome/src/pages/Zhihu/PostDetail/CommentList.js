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

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch(
      'http://zhuanlan.zhihu.com/api/columns/pinapps/posts/' +
        this.props.postid +
        '/comments?limit=20',
    )
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          replyCount: responseData.length,
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          isLoading: false,
        });
      })
      .done();
  }

  render() {
    console.log(this.state.replyCount);
    return (
      <FlatList
        style={styles.commentList}
        data={this.state.dataSource}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
        pageSize={10}
      />
    );
  }

  renderItem({item, index}) {
    let comment = item;
    return (
      <View style={styles.comment}>
        <Image
          source={{
            uri: comment.author.avatar.template
              .replace('{id}', comment.author.avatar.id)
              .replace('{size}', 'l'),
          }}
          style={styles.avatar}
        />

        <View style={styles.commentUser}>
          <Text style={styles.commentUserName}>{comment.author.name}</Text>
          <Text>{comment.content}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.createTime}> {comment.createdTime} </Text>
            <TouchableHighlight onPress={() => this.addFav(comment.id)}>
              <Text>赞</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  renderHeader() {
    return <Text>{this.state.replyCount}条评论</Text>;
  }

  addFav(commentId) {
    alert(commentId);
  }
}

const styles = StyleSheet.create({
  commentList: {
    marginTop: 0,
    paddingTop: 0,
    padding: 10,
  },

  comment: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  commentUser: {
    flexDirection: 'column',
    paddingLeft: 5,
  },
  createTime: {
    color: '#9d9e9f',
  },
  commentUserName: {
    color: '#225d99',
  },
});

export default CommentList;
