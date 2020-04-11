import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

class Loading extends React.Component {
  render() {
    return (
      <View style={[styles.container, styles.centerText]}>
        <ActivityIndicator
          animating={this.props.isLoading}
          style={styles.spinner}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centerText: {
    alignItems: 'center',
  },
  spinner: {
    width: 50,
  },
});

export default Loading;
