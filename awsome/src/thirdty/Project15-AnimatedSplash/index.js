import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import GoBack from '../GoBack';

export const title = '15 - AnimatedSplash';
export const description = '启动页';

export default class AnimatedSplash extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>目前需要原生支持</Text>
        <Text style={styles.text}>可以查看下面的项目看具体使用方式</Text>
        <Text style={styles.text}>
          https://github.com/remobile/react-native-splashscreen
        </Text>
        <GoBack {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  text: {
    lineHeight: 30,
    color: '#ffffff',
  },
});
