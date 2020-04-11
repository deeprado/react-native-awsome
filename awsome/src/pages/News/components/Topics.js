'use strict';

import React from 'react';

import {
  StyleSheet,
  Text,
  PixelRatio,
  TouchableHighlight,
  View,
  FlatList,
} from 'react-native';

const TOPICS = [
  {name: 'Sports'},
  {name: 'Entertainment'},
  {name: 'Music'},
  {name: 'Science'},
  {name: 'Technology'},
  {name: 'Business'},
  {name: 'World'},
  {name: 'Politics'},
];

class TopicsListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: [],
    };
  }

  render() {
    return (
      <View>
        <FlatList data={this.state.ds} renderItem={this.renderRow} />
      </View>
    );
  }

  renderRow({item, index}) {
    let topic = item;
    return (
      <NavButton
        key={index}
        onPress={() => this.selectTopic(topic)}
        text={topic.name}
      />
    );
  }

  selectTopic(topic) {
    this.setState({filter: topic.name.toLowerCase()});

    this.props.navigation.navigate('MainScreen', {
      title: topic.name,
      passProps: {
        filter: topic.name.toLowerCase(),
      },
    });
  }
}

class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        activeOpacity={1}
        animationVelocity={0}
        underlayColor="rgb(210, 230, 255)"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    padding: 9,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    marginTop: 5,
    padding: 7,
    marginLeft: 55,
  },
});

export default TopicsListView;
