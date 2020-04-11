import React from 'react';
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import GoBack from '../GoBack';
import autobind from 'autobind-decorator';
// import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {Carousel} from '@ant-design/react-native';

const {width, height} = Dimensions.get('window');

export const title = '04 - SnapChatMenu';
export const description = 'snapchat视频聊天';

@autobind
class SnapChatMenu extends React.Component {
  constructor(props) {
    super(props);
  }

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
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <View style={{}}>
          <Carousel
            style={styles.wrapper}
            selectedIndex={0}
            autoplay={false}
            infinite
            afterChange={this.onHorizontalSelectedIndexChange}>
            <View style={styles.slide1}>
              <Image
                style={styles.image}
                source={require('./images/left.png')}
              />
            </View>
            <View style={styles.slide2}>
              <Image
                style={styles.image}
                source={require('./images/left.png')}
              />

              {/* <Camera
              ref={cam => {
                this.camera = cam;
              }}
              style={styles.preview}
              aspect={Camera.constants.Aspect.Fill}>
              <TouchableOpacity onPress={() => this._takePicture()}>
                <View style={styles.capture}>
                  <Icon size={60} name={'camera'} color={'#333333'} />
                </View>
              </TouchableOpacity>
            </Camera> */}
            </View>
            <View style={styles.slide3}>
              <Image
                style={styles.image}
                source={require('./images/right.jpg')}
              />
            </View>
          </Carousel>
        </View>
        <GoBack {...this.props} />
      </View>
    );
  }

  _takePicture() {
    // this.camera
    //   .capture()
    //   .then(data => console.log(data))
    //   .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
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
  image: {
    width,
    resizeMode: 'contain',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height,
    width,
  },
  capture: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 85,
    height: 85,
  },
});

export default SnapChatMenu;
