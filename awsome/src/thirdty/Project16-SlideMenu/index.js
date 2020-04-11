import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Animatable from 'react-native-animatable';
import autobind from 'autobind-decorator';

const {width} = Dimensions.get('window');

const tableData = [
  {
    avatar: require('./images/avatar_catch.jpg'),
    bg: require('./images/haha_bg.jpeg'),
    title: 'Love mountain.',
    author: 'Allen Wang',
  },
  {
    avatar: require('./images/avatar_IcesZKi5_400x400.jpeg'),
    bg: require('./images/live_free.png'),
    title: 'New graphic design - LIVE FREE',
    author: 'Cole',
  },
  {
    avatar: require('./images/avatar_LlCpvQc2_400x400.jpg'),
    bg: require('./images/lonely_traveler.jpg'),
    title: 'Summer sand',
    author: 'Daniel Hooper',
  },
  {
    avatar: require('./images/avatar_MiDNqbJa_400x400.jpeg'),
    bg: require('./images/wallpaper.jpg'),
    title: 'Seeking for signal',
    author: 'Noby-Wan Kenobi',
  },
];
const menuItems = [
  'Everyday Moments',
  'Popular',
  'Editors',
  'Upcoming',
  'Fresh',
  'Stock-photos',
  'Trending',
];
const menuUpState = {
  height: 15, // 如果设置小于15，在收缩的时候会有抖动，不清楚原因
  opacity: 0,
  marginTop: -40,
};
const menuDownState = {
  height: 400,
  opacity: 1,
  marginTop: 0,
};

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={this.props.navigator.pop}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>返回</Text>
      </TouchableOpacity>
    );
  },

  Title(route, navigator, index, navState) {
    console.log(route.title);
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {navigator.props.initialRoute.title}
      </Text>
    );
  },

  RightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={this._onToggleSlideMenu}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>🍔</Text>
      </TouchableOpacity>
    );
  },
};

export const title = '16 - SlideMenu';
export const description = '下拉菜单';

@autobind
class SlideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTitle: menuItems[0],
      dataSource: tableData.concat(...tableData),
    };
    this.isMenuUp = true;
  }

  render() {
    return (
      <View style={styles.container}>
        <Animatable.View
          ref={menuView => (this.menuView = menuView)}
          style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  this._onToggleSlideMenu(index);
                  if (this.state.currentTitle !== item) {
                    this.setState({currentTitle: item});
                  }
                }}>
                <Animatable.Text
                  style={[
                    styles.itemMenuText,
                    this.state.currentTitle === item
                      ? styles.itemMenuDefaultText
                      : null,
                  ]}>
                  {item}
                </Animatable.Text>
              </TouchableOpacity>
            );
          })}
        </Animatable.View>
        {/* <Navigator
          debugOverlay={false}
          style={styles.appContainer}
          initialRoute={{
            title: this.state.currentTitle,
          }}
          renderScene={(route, navigator) => (
            <FlatList
              data={this.state.dataSource}
              renderItem={this._renderItem}
            />
          )}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: NavigationBarRouteMapper.LeftButton.bind(this),
                Title: NavigationBarRouteMapper.Title.bind(this),
                RightButton: NavigationBarRouteMapper.RightButton.bind(this),
              }}
              style={styles.navBar}
            />
          }
        /> */}
      </View>
    );
  }

  _renderItem({item: rowData, index: rowID}) {
    return (
      <Image style={styles.itemContainer} key={rowID} source={rowData.bg}>
        <View style={styles.itemUser}>
          <Image style={styles.itemAvatar} source={rowData.avatar} />
          <Text style={styles.itemTitle}>{rowData.title}</Text>
          <Text style={styles.itemAuthor}>{rowData.author}</Text>
        </View>
      </Image>
    );
  }

  _onToggleSlideMenu() {
    if (this.isMenuUp) {
      this.menuView.transitionTo(menuDownState);
      this.isMenuUp = false;
    } else {
      this.menuView.transitionTo(menuUpState);
      this.isMenuUp = true;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  itemContainer: {
    flex: 1,
    position: 'relative',
    resizeMode: 'cover',
    width, // 一定加上width，不然image resizemode 会有问题
    height: 250,
    overflow: 'hidden',
  },
  itemUser: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    marginTop: 20,
  },
  itemAvatar: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 25,
  },
  itemTitle: {
    position: 'absolute',
    bottom: 24,
    left: 60,
    fontSize: 16,
    color: 'white',
  },
  itemAuthor: {
    position: 'absolute',
    bottom: 4,
    left: 60,
    fontSize: 14,
    color: '#999999',
  },
  navBar: {
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  navBarText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    fontSize: 14,
    color: '#eeeeee',
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
  menuContainer: Object.assign(
    {
      backgroundColor: '#333333',
      paddingHorizontal: 15,
      paddingTop: 40,
    },
    menuUpState,
  ),
  itemMenuText: {
    fontSize: 20,
    fontFamily: 'Avenir Next',
    lineHeight: 36,
    color: '#666666',
  },
  itemMenuDefaultText: {
    color: 'white',
  },
});

export default SlideMenu;
