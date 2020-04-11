import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Picker,
  Dimensions,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';

import autobind from 'autobind-decorator';
import GoBack from '../GoBack';
const {width} = Dimensions.get('window');

export const title = '14 - EmojiSlotMachine';
export const description = 'Emoji抽奖机器';

const imageArray = ['👻', '👸', '💩', '😘', '🍔', '🤖', '🍟', '🐼', '🚖', '🐷'];

@autobind
class EmojiSlotMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSuccess: false,
    };

    this.dataArray1 = [];
    this.dataArray2 = [];
    this.dataArray3 = [];
  }

  componentWillMount() {
    for (let i = 0; i < 100; i++) {
      this.dataArray1.push(Math.floor(Math.random() * 10));
      this.dataArray2.push(Math.floor(Math.random() * 10));
      this.dataArray3.push(Math.floor(Math.random() * 10));
    }
  }

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require('./images/Hyperspace.jpg')}
        resizeMode="cover">
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            itemStyle={styles.emoji}
            onValueChange={emoji => this._onPickerChange(emoji, 'left')}>
            {this.dataArray1.map((item, index) => {
              const emoji = imageArray[item];
              return <Picker.Item key={index} label={emoji} value={emoji} />;
            })}
          </Picker>
          <Picker
            style={styles.picker}
            itemStyle={styles.emoji}
            onValueChange={emoji => this._onPickerChange(emoji, 'middle')}>
            {this.dataArray2.map((item, index) => {
              const emoji = imageArray[item];
              return <Picker.Item key={index} label={emoji} value={emoji} />;
            })}
          </Picker>
          <Picker
            style={styles.picker}
            itemStyle={styles.emoji}
            onValueChange={emoji => this._onPickerChange(emoji, 'right')}>
            {this.dataArray3.map((item, index) => {
              const emoji = imageArray[item];
              return <Picker.Item key={index} label={emoji} value={emoji} />;
            })}
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={() => this._go}
            underlayColor="transparent">
            <View style={styles.button}>
              <Text style={styles.buttonText}>Go</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.result}>
          <Text style={styles.resultText}>
            {this.state.isSuccess ? 'Bingo!' : '💔'}
          </Text>
        </View>
        <GoBack {...this.props} />
      </ImageBackground>
    );
  }

  _go() {}

  _onPickerChange(emoji, type) {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    width,
    height: 80,
  },
  picker: {
    flex: 1,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 60,
    lineHeight: 100,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 150,
    left: 0,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 300,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: 'green',
  },
  result: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    backgroundColor: 'transparent',
  },
});

export default EmojiSlotMachine;
