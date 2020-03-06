import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './PageStyles';

class Corner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleList: [],
    };
  }

  componentDidMount() {
    this.calStyleList();
  }

  calStyleList() {
    const {
      children,
      imageUrl,
      active,
      beforePreviousPage,
      previousPage,
      nextPage,
      afterNextPage,
      left,
      animPrev,
      animNext,
      animPrevPrevPage,
      blockTransitions,
      transitionEnd,
    } = this.props;
    let styleList = [styles.Wrapper];
    if (blockTransitions) {
      styleList.push(styles.BlockTransitions);
    }
    if (animPrevPrevPage) {
      styleList.push(styles.animPrevPrevPage);
    }
    if (animNext) {
      styleList.push(styles.animNext);
    }
    if (animPrev) {
      styleList.push(styles.animPrev);
    }
    if (active) {
      styleList.push(styles.active);
    }
    if (left) {
      styleList.push(styles.left);
    }
    if (beforePreviousPage) {
      styleList.push(styles.beforePreviousPage);
    }
    if (previousPage) {
      styleList.push(styles.previousPage);
    }
    if (nextPage) {
      styleList.push(styles.nextPage);
    }
    if (afterNextPage) {
      styleList.push(styles.afterNextPage);
    }
    this.setState({
      styleList,
    });
  }
  render() {
    const {children} = this.props;
    return (
      <ImageBackground>
        <View style={this.state.styleList}>{children}</View>
      </ImageBackground>
    );
  }
}

export default Corner;
