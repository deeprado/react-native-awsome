import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

//默认应用的容器组件
class App extends Component {
  //构造函数
  constructor(props) {
    super(props);
    this.state = {
      isConnected: null,
      type: null,
      isInternetReachable: false,
      details: null,
    };
  }

  //页面的组件渲染完毕（render）之后执行
  componentDidMount() {
    this.checkNetInfo();
    this.subscribe();
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  subscribe() {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    this.unsubscribe = unsubscribe;
  }

  checkNetInfo() {
    let that = this;
    NetInfo.fetch().then((state) => {
      console.log('netinfo state', state);
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      that.setState({
        isConnected: state.isConnected,
        type: state.type,
        isInternetReachable: state.isInternetReachable,
        details: state.details,
      });
    });
  }

  //渲染
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          当前的网络状态：
          {this.state.isConnected ? '网络在线' : '离线'}
        </Text>
        <Text style={styles.welcome}>当前网络连接类型： {this.state.type}</Text>
        <Text style={styles.welcome}>
          当前网络连接是否联网： {this.state.isInternetReachable}
        </Text>
        <Text style={styles.welcome}>
          当前连接网络是否计费：
          {this.state.type === 'wifi' ? (
            <Text>
              {this.state.details
                ? this.state.details.isConnectionExpensive
                : '--'}
            </Text>
          ) : (
            <Text>不支持</Text>
          )}
        </Text>
      </View>
    );
  }
}

//样式定义
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  welcome: {
    fontSize: 16,
    textAlign: 'left',
    margin: 10,
  },
});

export default App;
