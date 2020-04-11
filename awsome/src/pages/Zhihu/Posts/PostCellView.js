'use strict';

import React from 'react';

import {Image, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

class PostCellView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post,
    };
  }

  render() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <Image
            source={{uri: this.state.post.titleImage}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{this.state.post.title}</Text>
            <Text style={styles.time}>{this.state.post.publishedTime}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },

  thumbnail: {
    flex: 1,
    height: 200,
  },

  rightContainer: {
    flex: 1,
    padding: 5,
    marginBottom: 15,
  },

  title: {
    fontSize: 16,
    marginBottom: 3,
    textAlign: 'left',
  },

  time: {
    fontSize: 12,
    color: '#999999',
  },
});

export default PostCellView;
