import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  View,
  ImageBackground,
} from 'react-native';

import autobind from 'autobind-decorator';
import GoBack from '../GoBack';
import {BlurView} from 'react-native-blur';

import ImageBaseScroller from './ImageBaseScroller';

const {width, height} = Dimensions.get('window');

export const title = '09 - ImageScroller';
export const description = '图片滚动';

const image = require('./images/Steve.png');

@autobind
class ImageScroller extends React.Component {
  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={image}
        resizeMode="cover">
        <BlurView
          style={[styles.blurContainer, {position: 'absolute'}]}
          blurType="dark"
        />
        <View style={styles.imageContainer}>
          {image.width && (
            <ImageBaseScroller
              image={image}
              width={image.width}
              height={image.height}
              size={{width, height}}
              style={[styles.imageCropper, {width, height}]}
            />
          )}
        </View>
        <GoBack {...this.props} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  imageCropper: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default ImageScroller;
