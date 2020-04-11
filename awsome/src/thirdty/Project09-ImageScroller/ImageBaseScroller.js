import React from 'react';
import {ScrollView, Platform, Image, View} from 'react-native';

import autobind from 'autobind-decorator';

@autobind
class ImageBaseScroller extends React.Component {
  componentWillMount() {
    const widthScale = this.props.size.width / this.props.width;
    const heightScale = this.props.size.height / this.props.height;
    const minimumScale = Math.min(widthScale, heightScale);

    this._minimumZoomScale = Math.floor(minimumScale);
    this._maximumZoomScale = 3.0;

    this._horizontal = widthScale > heightScale;

    if (this._horizontal) {
      this._scaledImageSize = {
        width: this.props.width * heightScale,
        height: this.props.size.height,
      };
    } else {
      this._scaledImageSize = {
        width: this.props.size.width,
        height: this.props.height * widthScale,
      };
      if (Platform.OS === 'android') {
        // hack to work around Android ScrollView a) not supporting zoom, and
        // b) not supporting vertical scrolling when nested inside another
        // vertical ScrollView (which it is, when displayed inside UIExplorer)
        this._scaledImageSize.width *= 2;
        this._scaledImageSize.height *= 2;
      }
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={this.props.style}
          centerContent={true}
          maximumZoomScale={this._maximumZoomScale}
          minimumZoomScale={this._minimumZoomScale}
          horizontal={false}
          decelerationRate="fast"
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={200}>
          <Image source={this.props.image} style={this._scaledImageSize} />
        </ScrollView>
      </View>
    );
  }
}

export default ImageBaseScroller;
