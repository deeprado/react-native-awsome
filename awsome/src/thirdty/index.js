import React from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableHighlight,
  FlatList,
} from 'react-native';

import autobind from 'autobind-decorator';
import checkUpdate from './checkUpdate';

const routes = [
  {
    title: 'Project01',
    description: 'SimpleStopWatch',
    routeName: 'Project01',
  },
  {
    title: 'Project02',
    description: 'CustomFont',
    routeName: 'Project02',
  },
  {
    title: 'Project03',
    description: 'PlayLocalVideo',
    routeName: 'Project03',
  },
  {
    title: 'Project04',
    description: 'SnapChatMenu',
    routeName: 'Project04',
  },
  {
    title: 'Project05',
    description: 'CarouselEffect',
    routeName: 'Project05',
  },
  {
    title: 'Project06',
    description: 'FindMyLocation',
    routeName: 'Project06',
  },
  {
    title: 'Project07',
    description: 'PullToRefresh',
    routeName: 'Project07',
  },
  {
    title: 'Project08',
    description: 'RandomGradientColorMusic',
    routeName: 'Project08',
  },
  {
    title: 'Project09',
    description: 'ImageScroller',
    routeName: 'Project09',
  },
  {
    title: 'Project10',
    description: 'VideoBackground',
    routeName: 'Project10',
  },
  {
    title: 'Project11',
    description: 'ClearTableViewCell',
    routeName: 'Project11',
  },
  {
    title: 'Project12',
    description: 'LoginAnimation',
    routeName: 'Project12',
  },
  {
    title: 'Project13',
    description: 'AnimateTableViewCell',
    routeName: 'Project13',
  },
  {
    title: 'Project14',
    description: 'EmojiSlotMachine',
    routeName: 'Project14',
  },
  {
    title: 'Project15',
    description: 'AnimatedSplash',
    routeName: 'Project15',
  },
  {
    title: 'Project16',
    description: 'SlideMenu',
    routeName: 'Project16',
  },
  {
    title: 'Project17',
    description: 'TumblrMenu',
    routeName: 'Project17',
  },
  {
    title: 'Project18',
    description: 'LimitCharacters',
    routeName: 'Project18',
  },
];

class ThreetyDaysofReactNative extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // checkUpdate();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={{flex: 1, paddingBottom: 50}}>
          <ProjectList navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

@autobind
class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: routes,
    };
    this._renderItem = this._renderItem.bind(this);
    this._onPressRow = this._onPressRow.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.titleBarText}>30DaysofReactNative</Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={this.state.dataSource}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
      </View>
    );
  }

  _renderItem({item: project, index}) {
    return (
      <View key={index}>
        <TouchableHighlight onPress={() => this._onPressRow(project.routeName)}>
          <View style={styles.row}>
            <Text style={styles.rowTitleText}>{project.title}</Text>
            <Text style={styles.rowDetailText}>{project.description}</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
  }

  _onPressRow(routeName) {
    console.log('routeName', routeName)
    this.props.navigation.navigate(routeName);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  list: {
    backgroundColor: '#eeeeee',
  },
  titleBar: {
    height: 60,
    backgroundColor: '#05A5D1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBarText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    color: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowTitleText: {
    color: '#ea4c89',
    fontSize: 17,
    fontWeight: '500',
  },
  rowDetailText: {
    fontSize: 13,
    color: '#888888',
    lineHeight: 20,
    paddingLeft: 37,
  },
});

export default ThreetyDaysofReactNative;
