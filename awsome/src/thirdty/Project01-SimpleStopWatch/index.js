import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import autobind from 'autobind-decorator';
import {Icon} from 'react-native-elements';

import GoBack from '../GoBack';

export const title = '01 - SimpleStopWatch';
export const description = '一个简单的定时器';

@autobind
class SimpleStopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.timerID = null;
    this.state = {
      count: '0.0',
    };
  }

  componentDidMount() {
    this._onPause();
    this._reset();
  }

  componentWillUnmount() {
    this._onPause();
    this._reset();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.countWrap}>
          <Text style={styles.count}>{this.state.count}</Text>
          <View style={styles.reset}>
            <TouchableHighlight
              onPress={this._reset}
              underlayColor={'transparent'}>
              <Text style={styles.resetText}>重置</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.control}>
          <TouchableOpacity
            style={styles.left}
            onPress={this._onStart}
            activeOpacity={0.8}>
            <Icon size={60} name={'play'} type="feather" color={'#ffffff'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.right}
            onPress={this._onPause}
            activeOpacity={0.8}>
            <Icon size={60} name={'pause'} type="feather" color={'#ffffff'} />
          </TouchableOpacity>
        </View>
        <GoBack {...this.props} />
      </View>
    );
  }

  _onStart() {
    if (this.timerID) {
      return;
    }

    this.timerID = setInterval(() => {
      const count = this.state.count;
      this.setState({count: String((Number(count) + 0.1).toFixed(1))});
    }, 100);
  }

  _onPause() {
    clearInterval(this.timerID);
    this.timerID = null;
  }

  _reset() {
    // this.setState({count: '0.0'});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  countWrap: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#090123',
  },
  reset: {
    position: 'absolute',
    top: 38,
    right: 20,
  },
  resetText: {
    color: '#ffffff',
  },
  count: {
    fontFamily: 'Avenir Next',
    color: '#ffffff',
    fontWeight: '100',
    fontSize: 80,
  },
  control: {
    flex: 0.5,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#525BFC',
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#66BD09',
  },
});

export default SimpleStopWatch;
