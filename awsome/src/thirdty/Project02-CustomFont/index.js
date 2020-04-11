import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';

import GoBack from '../GoBack';
import autobind from 'autobind-decorator';

const {width} = Dimensions.get('window');

const fontNames = [
  'MFTongXin_Noncommercial-Regular',
  'MFJinHei_Noncommercial-Regular',
  'MFZhiHei_Noncommercial-Regular',
];

const text = `
  30Days of React Native.

  React Native 将会在2016大放异彩

  它正在吞噬其他移动开发方式

  你不需要学习任何Java、OC、Swift

  它的开发方式是非常先进的，希望iOS能尽快使用上HMR

  微博 @大P仙森
`;

export const title = '02 - CustomFont';
export const description = '自定义字体';

@autobind
class SimpleStopWatch extends React.Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
      currentFontFamily: fontNames[0],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text
            style={[styles.text, {fontFamily: this.state.currentFontFamily}]}>
            {text}
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableHighlight
            onPress={this._onChangeFont}
            underlayColor="transparent">
            <View style={styles.footerBtn}>
              <Text style={styles.btnText}>修改字体</Text>
            </View>
          </TouchableHighlight>
        </View>
        <GoBack {...this.props} />
      </View>
    );
  }

  _onChangeFont() {
    const currentIndex =
      this.state.currentIndex === fontNames.length - 1
        ? 0
        : this.state.currentIndex + 1;
    this.setState({
      currentIndex,
      currentFontFamily: fontNames[currentIndex],
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080610',
    position: 'relative',
    paddingTop: 40,
  },
  textContainer: {
    padding: 10,
  },
  text: {
    lineHeight: 26,
    color: '#ffffff',
  },
  footer: {
    position: 'absolute',
    left: 0,
    bottom: 40,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDE20B',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#080610',
  },
});

export default SimpleStopWatch;
