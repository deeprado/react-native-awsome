/**
 * Day 29
 * 3D Touch
 * in the index file
 */

'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Util from './utils';

export default class Day29 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Try 3D Touch on the home screen icon</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Util.size.width,
    height: Util.size.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});
