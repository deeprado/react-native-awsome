import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

class Corner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: props.left,
      top: props.top,
      right: props.right,
      bottom: props.bottom,
    };
  }

  _onPress = () => {
    this.state.click && this.state.click();
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View
          style={[
            {
              left: this.state.left,
              top: this.state.left,
              right: this.state.left,
              bottom: this.state.left,
            },
            styles.Wrapper,
          ]}
        />
      </TouchableOpacity>
    );
  }
}

// const Corner = ({left, top, right, bottom, click }) => {
//   return (
//     <div
//       style={{left, top, right, bottom}}
//       className={css.Wrapper}
//       onClick={() => click(left, top, right, bottom)}
//     >
//     </div>
//   );
// };

const styles = StyleSheet.create({
  Wrapper: {
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 1,
    cursor: 'pointer',
  },
});

export default Corner;
