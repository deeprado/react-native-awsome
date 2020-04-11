import React, {Component} from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Carousel} from '@ant-design/react-native';


const AsyncStorageKey = 'AS_';

export default class Slider extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AsyncStorage.getItem(AsyncStorageKey, (err, text) => {
      if (text === null) {
        console.log('没存呢！');
      } else {
        alert(text);
        this.props.navigation.navigate('Tab');
        // this.props.navigation.navigate('Tab');
      }
    });
  }

  onHorizontalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('horizontal change to', index);
  }
  onVerticalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('vertical change to', index);
  }

  toLogin() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <Carousel
          style={styles.wrapper}
          selectedIndex={2}
          autoplay
          infinite
          afterChange={this.onHorizontalSelectedIndexChange}>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <TouchableOpacity onPress={this.toLogin.bind(this)}>
              <Text style={styles.btn}>马上体验</Text>
            </TouchableOpacity>
          </View>
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'green',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  btn: {
    borderWidth: 1,
    borderColor: '#a1a24a',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 50,
    borderRadius: 5,
    alignItems: 'flex-end',
    backgroundColor: '#a1a24a',
    color: '#fff',
  },
});
