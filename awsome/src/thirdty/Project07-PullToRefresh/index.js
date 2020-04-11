import React from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import autobind from 'autobind-decorator';
import GoBack from '../GoBack';

const favoriteEmoji = ['🤗🤗🤗🤗🤗', '😅😅😅😅😅', '😆😆😆😆😆'];
const newFavoriteEmoji = [
  '🏃🏃🏃🏃🏃',
  '💩💩💩💩💩',
  '👸👸👸👸👸',
  '🤗🤗🤗🤗🤗',
  '😅😅😅😅😅',
  '😆😆😆😆😆',
];

export const title = '07 - PullToRefresh';
export const description = '下拉刷新';

@autobind
class PullToRefresh extends React.Component {
  constructor() {
    super();
    this.state = {
      isRefreshing: false,
      loaded: 0,
      rowData: favoriteEmoji.map((val, i) => ({emoji: val})),
    };
  }

  render() {
    const rows = this.state.rowData.map((row, i) => {
      return <Row key={i} {...row} onClick={this._onClick} />;
    });

    const now = new Date().toString();

    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={styles.scrollview}
          refreshControl={
            <RefreshControl
              style={styles.refresh}
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#eeeeee"
              title={'Last Update at ' + now}
              colors={['#ffffff', '#ffffff', '#ffffff']}
              progressBackgroundColor="#ffffff"
            />
          }>
          {rows}
        </ScrollView>
        <GoBack {...this.props} />
      </View>
    );
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      const rowData = newFavoriteEmoji
        .map((val, i) => ({
          emoji: val,
        }))
        .concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 5000);
  }
}

class Row extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.row}>
          <Text style={styles.text}>{this.props.emoji}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: '#16141B',
  },
  row: {
    padding: 20,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
  },
  refresh: {
    backgroundColor: '#333333',
  },
});

export default PullToRefresh;
