/**
 * Day 6
 * spotify welcome screen
 */
'use strict';

import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Util from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Carousel} from '@ant-design/react-native';

class Intro extends Component {
  onHorizontalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('horizontal change to', index);
  }
  onVerticalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('vertical change to', index);
  }

  render() {
    return (
      <View style={styles.backgroundFixed}>
        <View style={styles.logo}>
          <View style={styles.logoIconContainer}>
            <Icon name="spotify" size={60} color="white" />
          </View>
          <View style={styles.logoTextContainer}>
            <Text style={styles.logoText}>Spotify</Text>
          </View>
        </View>
        <View style={styles.sliders}>
          <Carousel
            style={styles.wrapper}
            selectedIndex={2}
            autoplay
            infinite
            afterChange={this.onHorizontalSelectedIndexChange}>
            <View style={styles.slide}>
              <Text style={styles.slideTextTitle}>Welcome</Text>
              <Text style={styles.slideText}>
                Sign up for free music on your phone,tablet
              </Text>
              <Text style={styles.slideText}>and computer.</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.slideTextTitle}>Browse</Text>
              <Text style={styles.slideText}>
                Explore top tracks, new releases and the right
              </Text>
              <Text style={styles.slideText}>playlist for every moment</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.slideTextTitle}>Search</Text>
              <Text style={styles.slideText}>
                Looking for that special album or artist? Just
              </Text>
              <Text style={styles.slideText}>search and hit play!</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.slideTextTitle}>Running</Text>
              <Text style={styles.slideText}>Music that perfectly matches</Text>
              <Text style={styles.slideText}>your tempo.</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.slideTextTitle}>Your Library</Text>
              <Text style={styles.slideText}>
                Save any song,album or artist to your own
              </Text>
              <Text style={styles.slideText}>music collection.</Text>
            </View>
          </Carousel>
        </View>
        <View style={styles.btnContainer}>
          <TouchableHighlight
            style={[styles.btn, {backgroundColor: '#201437'}]}>
            <Text style={styles.btnText}>LOG IN</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.btn, {backgroundColor: '#29b859'}]}>
            <Text style={styles.btnText}>SIGN UP</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default class extends Component {
  componentDidMount() {
    StatusBar.setBarStyle(1);
  }

  render() {
    return (
      <View style={styles.container}>
        <Intro />
      </View>
    );
  }
}

//<Video source={{uri: "moments"}}
//style={styles.backgroundFixed}
//resizeMode="cover" repeat={true} key="video1" />

const styles = StyleSheet.create({
  container: {
    height: Util.size.height,
    width: Util.size.width,
  },
  backgroundFixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  sliders: {
    position: 'absolute',
    width: Util.size.width,
    bottom: 70,
    left: 0,
  },
  slide: {
    flex: 1,
    height: Util.size.height - 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  slideText: {
    color: '#fff',
    textAlign: 'center',
  },
  slideTextTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  logo: {
    position: 'absolute',
    width: Util.size.width,
    top: 50,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 35,
    fontWeight: '700',
    backgroundColor: 'transparent',
  },
  logoIconContainer: {
    backgroundColor: 'transparent',
    paddingRight: 5,
    marginTop: 5,
  },
  logoTextContainer: {
    backgroundColor: 'transparent',
  },
  btnContainer: {
    position: 'absolute',
    width: Util.size.width,
    bottom: 0,
    left: 0,
    height: 40,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});
