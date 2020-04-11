import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import autobind from 'autobind-decorator';
import GoBack from '../GoBack';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');
const vw = width / 100;
const vh = height / 100;

export const title = '18 - LimitCharacters';
export const description = '输入字数限制';

@autobind
class LimitCharacters extends React.Component {
  constructor() {
    super();
    this.state = {
      limitNum: 150,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <Image
              source={require('./images/avatar.jpg')}
              style={styles.avatar}
            />
            <TextInput
              style={styles.textinput}
              maxLength={150}
              multiline={true}
              onChangeText={this._onChange}
            />
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.tweet} onPress={() => {}}>
          <Text style={styles.tweetText}>Tweet</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <View style={styles.actions}>
            <TouchableOpacity>
              <Icon name="mic-c" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="mic-c" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="mic-c" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.limitNum}>{this.state.limitNum}</Text>
        </View>
        <GoBack {...this.props} />
      </View>
    );
  }

  _onChange(text) {
    this.setState({limitNum: 150 - text.length});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#333333',
  },
  tweet: {
    position: 'absolute',
    top: 40,
    right: 10,
  },
  tweetText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#199634',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  textinput: {
    flex: 1,
    fontSize: 16,
    height: 600,
    overflow: 'hidden',
    color: 'white',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
  },
  limitNum: {
    color: '#ffffff',
    marginRight: 20,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    overflow: 'hidden',
  },
  icon: {
    color: 'white',
    fontSize: 30,
    marginHorizontal: 10,
  },
});

export default LimitCharacters;
