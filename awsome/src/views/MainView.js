'use strict';
import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Util from '../views/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

class MainView extends Component {
  constructor() {
    super();
    this.state = {
      days: [
        {
          key: 0,
          title: 'A stopwatch',
          routeName: 'Day1',
          isFA: false,
          icon: 'ios-stopwatch',
          size: 48,
          color: '#ff856c',
          hideNav: false,
        },
        {
          key: 1,
          routeName: 'Day2',
          title: 'A weather app',
          isFA: false,
          icon: 'ios-partly-sunny',
          size: 60,
          color: '#90bdc1',
          hideNav: true,
        },
        {
          key: 2,
          title: 'twitter',
          isFA: false,
          icon: 'logo-twitter',
          size: 50,
          color: '#2aa2ef',
          hideNav: true,
        },
        {
          key: 3,
          title: 'cocoapods',
          routeName: 'Day4',
          isFA: true,
          icon: 'contao',
          size: 50,
          color: '#FF9A05',
          hideNav: false,
        },
        {
          key: 4,
          title: 'find my location',
          routeName: 'Day5',
          isFA: false,
          icon: 'md-pin',
          size: 50,
          color: '#00D204',
          hideNav: false,
        },
        {
          key: 5,
          title: 'Spotify',
          routeName: 'Day6',
          isFA: true,
          icon: 'spotify',
          size: 50,
          color: '#777',
          hideNav: true,
        },
        {
          key: 6,
          title: 'Moveable Circle',
          routeName: 'Day7',
          isFA: false,
          icon: 'ios-baseball',
          size: 50,
          color: '#5e2a06',
          hideNav: true,
        },
        {
          key: 7,
          title: 'Swipe Left Menu',
          routeName: 'Day7',
          isFA: true,
          icon: 'google',
          size: 50,
          color: '#4285f4',
          hideNav: true,
        },
        {
          key: 8,
          title: 'Twitter Parallax View',
          routeName: 'Day9',
          isFA: true,
          icon: 'twitter-square',
          size: 50,
          color: '#2aa2ef',
          hideNav: true,
        },
        {
          key: 9,
          title: 'Tumblr Menu',
          routeName: 'Day10',
          isFA: false,
          icon: 'logo-tumblr',
          size: 50,
          color: '#37465c',
          hideNav: true,
        },
        {
          key: 10,
          title: 'OpenGL',
          routeName: 'Day11',
          isFA: false,
          icon: 'md-contrast',
          size: 50,
          color: '#2F3600',
          hideNav: false,
        },
        {
          key: 11,
          title: 'charts',
          routeName: 'Day12',
          isFA: false,
          icon: 'ios-stats',
          size: 50,
          color: '#fd8f9d',
          hideNav: false,
        },
        {
          key: 12,
          title: 'tweet',
          routeName: 'Day13',
          isFA: false,
          icon: 'md-chatboxes',
          size: 50,
          color: '#83709d',
          hideNav: true,
        },
        {
          key: 13,
          title: 'tinder',
          routeName: 'Day14',
          isFA: true,
          icon: 'fire',
          size: 50,
          color: '#ff6b6b',
          hideNav: true,
        },
        {
          key: 14,
          title: 'Time picker',
          routeName: 'Day15',
          isFA: false,
          icon: 'ios-calendar-outline',
          size: 50,
          color: '#ec240e',
          hideNav: false,
        },
        {
          key: 15,
          title: 'Gesture unlock',
          routeName: 'Day16',
          isFA: false,
          icon: 'ios-unlock',
          size: 50,
          color: '#32A69B',
          hideNav: true,
        },
        {
          key: 16,
          title: 'Fuzzy search',
          routeName: 'Day17',
          isFA: false,
          icon: 'md-search',
          size: 50,
          color: '#69B32A',
          hideNav: false,
        },
        {
          key: 17,
          title: 'Sortable',
          routeName: 'Day18',
          isFA: false,
          icon: 'md-move',
          size: 50,
          color: '#68231A',
          hideNav: true,
        },
        {
          key: 18,
          title: 'TouchID to unlock',
          routeName: 'Day19',
          isFA: false,
          icon: 'ios-log-in',
          size: 50,
          color: '#fdbded',
          hideNav: true,
        },
        {
          key: 19,
          title: 'Single page Reminder',
          routeName: 'Day20',
          isFA: false,
          icon: 'ios-list-outline',
          size: 50,
          color: '#68d746',
          hideNav: true,
        },
        {
          key: 20,
          title: 'Multi page Reminder',
          routeName: 'Day21',
          isFA: false,
          icon: 'ios-paper-outline',
          size: 50,
          color: '#fe952b',
          hideNav: true,
        },
        {
          key: 21,
          title: 'Google Now',
          routeName: 'Day22',
          isFA: false,
          icon: 'ios-mic-outline',
          size: 50,
          color: '#4285f4',
          hideNav: true,
        },
        {
          key: 22,
          title: 'Local WebView',
          routeName: 'Day23',
          isFA: true,
          icon: 'safari',
          size: 50,
          color: '#23bfe7',
          hideNav: false,
        },
        {
          key: 23,
          title: 'Youtube scrollable tab',
          routeName: 'Day24',
          isFA: false,
          icon: 'logo-youtube',
          size: 50,
          color: '#e32524',
          hideNav: true,
        },
        {
          key: 24,
          title: 'custome in-app browser',
          routeName: 'Day25',
          isFA: false,
          icon: 'ios-globe',
          size: 50,
          color: '#00ab6b',
          hideNav: true,
        },
        {
          key: 25,
          title: 'swipe and switch',
          routeName: 'Day26',
          isFA: false,
          icon: 'md-shuffle',
          size: 50,
          color: '#893D54',
          hideNav: true,
        },
        {
          key: 26,
          title: 'iMessage Gradient',
          routeName: 'Day27',
          isFA: false,
          icon: 'ios-chatbubbles',
          size: 50,
          color: '#248ef5',
          hideNav: false,
        },
        {
          key: 27,
          title: 'iMessage image picker',
          routeName: 'Day28',
          isFA: false,
          icon: 'md-images',
          size: 50,
          color: '#f5248e',
          hideNav: true,
        },
        {
          key: 28,
          title: '3d touch',
          routeName: 'Day29',
          isFA: false,
          icon: 'ios-navigate',
          size: 50,
          color: '#48f52e',
          hideNav: false,
        },
        {
          key: 29,
          title: 'Push Notifications',
          routeName: 'Day20',
          isFA: false,
          icon: 'md-notifications',
          size: 50,
          color: '#f27405',
          hideNav: false,
        },
      ],
    };
  }

  _jumpToDay(index) {
    let routeName = this.state.days[index].routeName;
    this.props.navigation.navigate(routeName, {
      title: this.state.days[index].title,
      index: index + 1,
      display: !this.state.days[index].hideNav,
    });
  }

  render() {
    let that = this;
    let boxs = this.state.days.map(function(elem, index) {
      return (
        <TouchableOpacity
          activeOpacit={1}
          key={elem.key}
          style={[
            styles.touchBox,
            index % 3 === 2 ? styles.touchBox2 : styles.touchBox1,
          ]}
          underlayColor="#eee"
          onPress={() => that._jumpToDay(index)}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxText}>Day{index + 1}</Text>
            {elem.isFA ? (
              <IconFA
                size={elem.size}
                name={elem.icon}
                style={[styles.boxIcon, {color: elem.color}]}
              />
            ) : (
              <Icon
                size={elem.size}
                name={elem.icon}
                style={[styles.boxIcon, {color: elem.color}]}
              />
            )}
          </View>
        </TouchableOpacity>
      );
    });
    return (
      <ScrollView style={styles.mainView} title={this.props.title}>
        <Swiper
          height={150}
          showsButtons={false}
          autoplay={true}
          activeDot={
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }>
          <TouchableOpacity activeOpacit={1} onPress={() => that._jumpToDay(0)}>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={require('../views/img/day1.png')}
              />
              <Text style={styles.slideText}>Day1: Timer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacit={1} onPress={() => that._jumpToDay(1)}>
            <View style={styles.slide}>
              <Image
                style={styles.image}
                source={require('../views/img/day2.png')}
              />
              <Text style={styles.slideText}>Day2: Weather</Text>
            </View>
          </TouchableOpacity>
        </Swiper>
        <View style={styles.touchBoxContainer}>{boxs}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    marginTop: 55,
  },
  navBar: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navTitle: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '500',
  },
  navBackBtn: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 18,
    color: '#555',
  },
  itemWrapper: {
    backgroundColor: '#f3f3f3',
  },
  touchBox: {
    width: Util.size.width / 3 - 0.33334,
    height: Util.size.width / 3,
    backgroundColor: '#fff',
  },
  touchBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Util.size.width,
    borderTopWidth: Util.pixel,
    borderTopColor: '#ccc',
    borderLeftWidth: Util.pixel,
    borderLeftColor: '#ccc',
    borderRightWidth: Util.pixel,
    borderRightColor: '#ccc',
  },
  touchBox1: {
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ccc',
    borderRightWidth: Util.pixel,
    borderRightColor: '#ccc',
  },
  touchBox2: {
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ccc',
    borderLeftWidth: Util.pixel,
    borderLeftColor: '#ccc',
  },
  boxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Util.size.width / 3,
    height: Util.size.width / 3,
  },
  boxIcon: {
    position: 'relative',
    top: -10,
  },
  boxText: {
    position: 'absolute',
    bottom: 15,
    width: Util.size.width / 3,
    textAlign: 'center',
    left: 0,
    backgroundColor: 'transparent',
  },
  slide: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: Util.size.width,
    textAlign: 'center',
    fontSize: 12,
  },
  image: {
    width: Util.size.width,
    height: 80,
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
});

export default MainView;
