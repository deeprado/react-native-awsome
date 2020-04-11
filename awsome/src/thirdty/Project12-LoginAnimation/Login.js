import React from 'react';
import {
  View,
  Text,
  TextInput,
  Easing,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import autobind from 'autobind-decorator';
import GoBack from '../GoBack';

const {width} = Dimensions.get('window');
const vw = width / 100;

@autobind
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      marginValue1: new Animated.Value(-1000),
      marginValue2: new Animated.Value(-1000),
      marginValue3: new Animated.Value(-1000),
      buttonSize: new Animated.Value(150),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.marginValue1, {
      toValue: 0, // 目标值
      duration: 800, // 动画时间
      easing: Easing.easeOut, // 缓动函数
    }).start();

    Animated.timing(this.state.marginValue2, {
      toValue: 0, // 目标值
      duration: 800, // 动画时间
      delay: 100,
      easing: Easing.easeOut, // 缓动函数
    }).start();

    Animated.timing(this.state.marginValue3, {
      toValue: 0, // 目标值
      duration: 800, // 动画时间
      delay: 200,
      easing: Easing.easeOut, // 缓动函数
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>欢迎</Text>
        </View>
        <Animated.View
          style={[styles.input, {marginLeft: this.state.marginValue1}]}>
          <View>
            <TextInput
              style={[styles.iptText, styles.iptUsernameText]}
              autoCapitalize="none"
              placeholder="用户名"
            />
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.input, {marginLeft: this.state.marginValue2}]}>
          <View>
            <TextInput
              style={[styles.iptText, styles.iptPasswordText]}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholder="密码"
            />
          </View>
        </Animated.View>
        <Animated.View
          style={[styles.input, {marginLeft: this.state.marginValue2}]}>
          <TouchableHighlight
            onPress={this._onBttonAniamte}
            underlayColor="transparent">
            <Animated.View
              style={[styles.button, {width: this.state.buttonSize}]}>
              <Text style={styles.buttonText}>登录</Text>
            </Animated.View>
          </TouchableHighlight>
        </Animated.View>
        <GoBack {...this.props} />
      </View>
    );
  }

  _onBttonAniamte() {
    Animated.spring(this.state.buttonSize, {
      toValue: 200, // 目标值
      friction: 2, // Bouncier spring
    }).start();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  title: {
    marginTop: 36,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    color: '#ffffff',
  },
  input: {
    height: 40,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iptText: {
    height: 50,
    width: 90 * vw,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    height: 50,
    width: 150,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#136E03',
  },
  buttonText: {
    fontSize: 14,
    color: '#ffffff',
  },
});

export default Login;
