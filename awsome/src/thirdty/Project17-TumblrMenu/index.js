import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import autobind from 'autobind-decorator';
import GoBack from '../GoBack';
import {BlurView} from 'react-native-blur';
import Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import Tabs from 'react-native-tabs';

const {width, height} = Dimensions.get('window');
const vw = width / 100;
const vh = height / 100;

const listData = [
  {
    avatar: require('./images/718835727.png'),
    name: 'Hugo',
    pic: require('./images/1-hjGpOnCIu4sP7H4V2sdFcA.png'),
  },
  {
    avatar: require('./images/89w7SbqD_400x400.png'),
    name: 'MengTo',
    pic: require('./images/22266727550_5decf72626_o.jpg'),
  },
];

const menuData = [
  {
    ref: 'text',
    text: 'Text',
    icon: require('./images/Text.png'),
    out: {left: -60, top: 80, opacity: 0},
    in: {left: 50 * vw - 120, top: 80, opacity: 1},
  },
  {
    ref: 'photo',
    text: 'Photo',
    icon: require('./images/Photo.png'),
    out: {right: -60, top: 80, opacity: 0},
    in: {right: 50 * vw - 120, top: 80, opacity: 1},
  },
  {
    ref: 'quote',
    text: 'Quote',
    icon: require('./images/Quote.png'),
    out: {left: -20, top: 240, opacity: 0},
    in: {left: 50 * vw - 120, top: 240, opacity: 1},
  },
  {
    ref: 'link',
    text: 'Link',
    icon: require('./images/Link.png'),
    out: {right: -20, top: 240, opacity: 0},
    in: {right: 50 * vw - 120, top: 240, opacity: 1},
  },
  {
    ref: 'chat',
    text: 'Chat',
    icon: require('./images/Chat.png'),
    out: {left: 20, top: 400, opacity: 0},
    in: {left: 50 * vw - 120, top: 400, opacity: 1},
  },
  {
    ref: 'audio',
    text: 'Audio',
    icon: require('./images/Audio.png'),
    out: {right: 20, top: 400, opacity: 0},
    in: {right: 50 * vw - 120, top: 400, opacity: 1},
  },
];

export const title = '17 - TumblrMenu';
export const description = 'Tumblr菜单';

@autobind
class TumblrMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: listData,
      isShow: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          name="edit"
          style={styles.content}
          data={this.state.dataSource}
          renderItem={this._renderItem}
        />

        <Tabs selected={'edit'} style={{backgroundColor: 'darkslateblue'}}>
          <Icon name="ios-home" style={styles.tab} />
          <Icon name="ios-search-strong" style={styles.tab} />
          <View style={styles.tabEditContainer} onSelect={this._toggleMenu}>
            <Icon name="edit" style={[styles.tab, styles.tabEdit]} />
          </View>
          <Icon name="chatbubble-working" style={styles.tab} />
          <Icon name="person" style={styles.tab} />
        </Tabs>

        <BlurView
          blurType="dark"
          style={[styles.mark, {left: this.state.isShow ? 0 : -1000}]}>
          {menuData.map((item, index) => {
            return (
              <Animatable.View
                ref={item.ref}
                key={index}
                style={[styles.menuItem, item.out]}>
                <Image source={item.icon} />
                <Text style={styles.menuText}>{item.text}</Text>
              </Animatable.View>
            );
          })}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={this._toggleMenu}>
            <Text style={styles.menuButtonText}>Nevermind</Text>
          </TouchableOpacity>
        </BlurView>
        <GoBack {...this.props} />
      </View>
    );
  }

  _renderItem({item: rowData, index: rowID}) {
    return (
      <View style={styles.itemContainer} key={rowID}>
        <View style={styles.itemHeader}>
          <View style={styles.itemAvatar}>
            <Image style={styles.itemAvatar} source={rowData.avatar} />
          </View>
          <Text style={styles.itemName}>{rowData.name}</Text>
        </View>
        <Image
          style={styles.itemImage}
          source={rowData.pic}
          resizeMode="cover"
        />
      </View>
    );
  }

  _toggleMenu() {
    if (this.state.isShow) {
      setTimeout(() => {
        this.setState({isShow: false});
      }, 200);

      menuData.map(item => {
        this.refs[item.ref].transitionTo(item.out);
      });
    } else {
      this.setState({isShow: true});

      menuData.map(item => {
        this.refs[item.ref].transitionTo(item.in);
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2C43',
  },
  content: {
    marginTop: 60,
  },
  itemContainer: {
    marginTop: 20,
  },
  itemHeader: {
    flex: 1,
    flexDirection: 'row',
    width,
    backgroundColor: 'white',
    padding: 10,
  },
  itemAvatar: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  itemName: {
    flex: 1,
    fontFamily: 'Avenir Next',
    lineHeight: 30,
    color: 'black',
  },
  itemImage: {
    width,
    height: 250,
  },
  tab: {
    fontSize: 25,
    color: '#bbbbbb',
  },
  tabEditContainer: {
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#4F95C4',
  },
  tabEdit: {
    color: '#333333',
  },
  mark: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: 'center',
  },
  menuItem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: 'white',
  },
  menuButton: {
    marginTop: 80 * vh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
});

export default TumblrMenu;
