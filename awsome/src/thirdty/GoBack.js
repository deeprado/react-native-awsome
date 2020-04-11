import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';

import {Icon} from 'react-native-elements';

class GoBack extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this._goBack.bind(this)}
          underlayColor="transparent">
          <View style={styles.arrow}>
            <Icon name="arrow-left" type="feather" size={40} color="#fff" />
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _goBack() {
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 0,
  },
  arrow: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GoBack;
