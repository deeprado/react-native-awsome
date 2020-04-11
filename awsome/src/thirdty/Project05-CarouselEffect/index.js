import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';

import GoBack from '../GoBack';
import autobind from 'autobind-decorator';
import {BlurView} from 'react-native-blur';

const {width} = Dimensions.get('window');

export const title = '05 - CarouselEffect';
export const description = '轮播图效果';

const imageList = [
  {image: require('./images/hello.jpg'), text: 'Hello there, i miss u.'},
  {image: require('./images/dudu.jpg'), text: '🐳🐳🐳🐳🐳'},
  {
    image: require('./images/bodyline.png'),
    text: 'Training like this, #bodyline',
  },
  {image: require('./images/wave.jpg'), text: "I'm hungry, indeed."},
  {image: require('./images/darkvarder.png'), text: 'Dark Varder, #emoji'},
  {image: require('./images/hhhhh.jpg'), text: 'I have no idea, bitch'},
];

@autobind
class CarouselEffect extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: imageList,
    };
  }

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('./images/blue.png')}
        resizeMode="stretch">
        <BlurView
          style={[styles.container, {position: 'absolute'}]}
          blurType="light"
        />
        <View style={styles.container}>
          <View style={styles.listContainer}>
            <View style={styles.listContent}>
              <FlatList
                data={this.state.dataSource}
                renderItem={this._renderItem}
                horizontal={true}
                showsVerticalScrollIndicator={true}
              />
            </View>
          </View>
          <GoBack {...this.props} />
        </View>
      </ImageBackground>
    );
  }

  _renderItem({item: rowData, index: rowID}) {
    const isLast = Number(rowID) === imageList.length - 1;
    return (
      <View
        key={rowID}
        style={[styles.imageItem, isLast ? styles.lastImage : {}]}>
        <ImageBackground
          source={rowData.image}
          style={styles.image}
          resizeMode="cover">
          <BlurView
            style={[styles.textContainer, {position: 'absolute'}]}
            blurType="xlight"
          />
          <Text style={styles.text}>{rowData.text}</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  listContent: {
    width,
    height: 450,
  },
  imageItem: {
    position: 'relative',
    marginLeft: 20,
    width: 300,
    height: 400,
    borderRadius: 7,
    overflow: 'hidden',
  },
  lastImage: {
    marginRight: 20,
  },
  image: {
    width: 300,
    height: 400,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 300,
    height: 60,
    overflow: 'hidden',
    paddingLeft: 15,
  },
  text: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 40,
  },
});

export default CarouselEffect;
