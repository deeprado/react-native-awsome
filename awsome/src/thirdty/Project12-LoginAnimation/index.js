import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import autobind from 'autobind-decorator';
import Login from './Login';
import GoBack from '../GoBack';

const {width} = Dimensions.get('window');
const vw = width / 100;

export const title = '12 - LoginAnimation';
export const description = '登录动画';

@autobind
class LoginAnimation extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image
            style={styles.title}
            source={require('./images/login-secondary-logo.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight>
            <View style={[styles.button, styles.btnSignup]}>
              <Text style={styles.btnSignupText}>注册</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this._onPress()}
            underlayColor="transparent">
            <View style={[styles.button, styles.btnLogin]}>
              <Text style={styles.btnLoginText}>登录</Text>
            </View>
          </TouchableHighlight>
        </View>
        <GoBack {...this.props} />
      </View>
    );
  }

  _onPress() {
    this.props.navigation.navigate('Login', {
      title: '登录',
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  titleContainer: {
    width,
    position: 'absolute',
    left: 0,
    top: 60,
    alignItems: 'center',
  },
  title: {
    width: 80 * vw,
  },
  buttonContainer: {
    width,
    position: 'absolute',
    left: 0,
    bottom: 30,
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 320,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: '#136E03',
  },
  btnLoginText: {
    fontSize: 14,
    color: '#ffffff',
  },
  btnSignup: {
    backgroundColor: '#ffffff',
  },
  btnSignupText: {
    fontSize: 16,
    color: 'green',
  },
});

export default LoginAnimation;
