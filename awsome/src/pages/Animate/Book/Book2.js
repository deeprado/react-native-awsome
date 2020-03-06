import React, {cloneElement} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
  PanResponder,
} from 'react-native';
import {Provider, Modal, Toast} from '@ant-design/react-native';
import {Icon, Slider} from 'react-native-elements';
import autobind from 'autobind-decorator';

import Battery from '../../../components/Battery';

import Util from '../../Reader/utils/util';

// import {_} from 'lodash';

// console.log('_', _);

// // _.wrap是lodash的一个函数,用来包裹传入的函数，然后返回一个新的函数
// Text.prototype.render = _.wrap(Text.prototype.render, function(func, ...args) {
//   let originText = func.apply(this, args);
//   return cloneElement(originText, {
//     style: [originText.props.style, styles.defaultFontFamily],
//   });
// });

let chapter1 = {
  _id: '58ccc05923ff5c6b9d5053cc',
  title: '上架感言',
  postfix: '2352954.html',
  number: 0,
  novel: '58ccc05923ff5c6b9d5053cb',
  __v: 0,
  content:
    '&nbsp;&nbsp;&nbsp;&nbsp;《1852铁血中华》已经上架。&nbsp;&nbsp;&nbsp;&nbsp;这次写太平天国时代有很多原因，不过最重要的原因之一，是因为太平天国运动是清末民初最后一次体制外的造反，也是中国到现在为止的最后一次大规模农民起义。&nbsp;&nbsp;&nbsp;&nbsp;一提起太平天国来，现在的人很容易想起的就是拜上帝教、洪教主，而实际情况又是如何？&nbsp;&nbsp;&nbsp;&nbsp;在那个时代，满清朝廷虽然给洋人跪了，但是整个中国各阶层却远没有20世纪初面临亡国灭种危局的绝望之情。&nbsp;&nbsp;&nbsp;&nbsp;这就是太平天国时代的中国。&nbsp;&nbsp;&nbsp;&nbsp;在全世界主要大国正向着空前激烈的时代突飞猛进的时候，中国的变化远没有世界来的激烈。本书的主角要承担的责任，就是在中国掀起比世界更加激烈的变化。&nbsp;&nbsp;&nbsp;&nbsp;对大家以往的支持，绯红万分感谢！绯红一定会努力继续写书，请大家继续支持，继续订阅！谢谢！！&nbsp;&nbsp;&nbsp;&nbsp;[三七中文 www.37zw.com]百度搜索“37zw.com”',
};
let chapter2 = {
  _id: '58ccc05923ff5c6b9d5053cd',
  title: '第1章 韦泽（一）',
  postfix: '2352958.html',
  number: 1,
  novel: '58ccc05923ff5c6b9d5053cb',
  content:
    '&nbsp;&nbsp;&nbsp;&nbsp;1852年2月6日上午，广西大瑶山一处山岭上的树林旁边。&nbsp;&nbsp;&nbsp;&nbsp;二十几名年轻的战士正在战场上，他们都穿着广西普通百姓的服色，身上是黑色的粗布短衣短裤，腰间束了白色的粗布腰带，腿上打着白布绑腿，脚上则是草鞋。因为天冷，战士们脚上缠了原本可能是白色，现在已经脏兮兮看不出颜色的裹脚布。众人脑袋上并不是广西那种包头布，因为大家都把长发在头上扎了一个发髻，所以在脑袋上箍了一条白色粗布发带，猛看上仿佛是一支奔丧的队伍。&nbsp;&nbsp;&nbsp;&nbsp;一位浓眉大眼的青年停在战场中央，棱角分明脸庞有着少年轻人特有的圆润感觉，怎么看都不超过20岁的模样。这名笑道：“辫子又不重，带回去正好请功！”&nbsp;&nbsp;&nbsp;&nbsp;广西号称百万大山，大瑶山山峦叠翠，在战场附近就有山谷。清军的尸体被抛入山谷，转眼就没了踪影。清军还能留在战场上的是他们的武器，十几名清军的武器中一半是长枪，另一半则是火绳枪。这就是韦泽回到这个时代之后另一件不能立刻接受的事情。这个时业化的日本进行着艰苦卓绝的战斗，并且顽强的不断扩大敌后根据地，把中国的国土从侵略者手中一寸寸的夺回来。&nbsp;&nbsp;&nbsp;&nbsp;满清的火绳枪固然与这时代流行的燧发枪有不小差距，却远没有到达一场战斗只有五发子弹的八路军与敌人之间的差距。在武器装备差距有限的局面下还能被打得签署了无数丧权辱国的条约，这样的满清是必须消灭掉的。不消灭掉满清，就注定没有中国的未来。韦泽对此坚信不移。&nbsp;&nbsp;&nbsp;&nbsp;十几名清军携带的钱财不多，韦泽登记造册后让负责后勤的伍长林阿生把财物收起来。&nbsp;&nbsp;&nbsp;&nbsp;“出发！”韦泽命道。26人的小队扛起自己的装备，在韦泽的带领下向着东北方向继续前进了。&nbsp;&nbsp;&nbsp;&nbsp;[三七中文 www.37zw.com]百度搜索“37zw.com”',
};
let chapters = [chapter1, chapter2];
let firstRenderChapters = {
  chapters: chapters,
  progress: 0,
  countChapter: 23232,
};

// 背景颜色
const Colors = [
  '#F6D998',
  '#DBE6C5',
  '#FAFAFA',
  '#E7E1C6',
  '#463D3D',
  '#3A3F44',
];
// 翻页方式
const PageTurns = ['无', '覆盖', '平滑', '仿真'];
// 间距（行高）
const Spaces = [5, 10, 15];

// 翻书动画 覆盖
@autobind
class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curIndex: 0,
      batteryLevel: 50,
      curFontSize: 24,
      _data: [],
    };
    this.parseChapter();
    this.bindPan();
  }

  componentDidMount() {
    this.parseChapter();
  }

  bindPan = () => {
    this._panResponder = PanResponder.create({
      // 返回ture时，表示该组件愿意成为触摸事件的响应者，如触摸点击。默认返回false。
      onStartShouldSetPanResponder: () => true,
      // 返回ture时，表示该组件愿意成为触摸(滑屏)事件的响应者，如触摸滑屏，默认返回false。
      onMoveShouldSetPanResponder: () => true,
      // 与onStartShouldSetPanResponder相同，当此组件A里包含了子组件B也为触摸事件响应者时，若此时设为true，则父组件A优先级更高
      onStartShouldSetPanResponderCapture: () => true,
      // 与onMoveShouldSetPanResponder相同，当此组件A里包含了子组件B也为触摸事件响应者时，若此时设为true，则父组件A优先级更高
      onMoveShouldSetPanResponderCapture: () => true,
      // 手势刚开始触摸(即刚接触屏幕时)时，若响应成功则触发该事件
      onPanResponderGrant: (evt, gestureState) => {},
      // 手势刚开始触摸(即刚接触屏幕时)时，若响应失败则触发该事件，失败原因有可能是其它组件正在响应手势且不肯放权
      onResponderReject: (evt, gestureState) => {},
      // 手势滑动时触发该事件
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState.dx);
      },
      // 手势松开时触发该事件
      onPanResponderRelease: (evt, gestureState) => {
        console.log('onPanResponderRelease', gestureState.dx);
        if (gestureState.dx > 10) {
          this.switchPrev();
        }
        if (gestureState.dx < -10) {
          this.switchNext();
        }
      },
      // 当其它组件需要响应手势时，此时为ture则表示本组件愿意放权给其它组件响应；为false时表示不放权，依然由本组件来响应手势事件
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      // 当组件响应放权后(即由其它组件拿到了手势响应权)触发该事件
      onPanResponderTerminate: (evt, gestureState) => {},
    });
  };

  parseChapter() {
    let arr = [];
    let content = Util.nbsp2Space(chapters[0].content);
    let _arr = Util.handleContent(content);
    _arr.forEach(function(_item) {
      let chapterInfo = {
        title: chapters[0].title,
        num: chapters[0].number,
        content: _item,
      };
      arr.push(chapterInfo);
    });
    if (chapters.length === 2) {
      content = Util.nbsp2Space(chapters[1].content);
      _arr = Util.handleContent(content);
      this.nextChapter = _arr.length;
      _arr.forEach(function(_item) {
        let chapterInfo = {
          title: chapters[1].title,
          num: chapters[1].number,
          content: _item,
        };
        arr.push(chapterInfo);
      });
    }
    this._data = arr;
    this.setState({
      _data: arr,
    });
  }

  switchPrev = () => {
    console.log('switchPrev');
    this.setState({
      curIndex: this.state.curIndex - 1,
    });
  };

  switchNext = () => {
    console.log('switchNext');
    this.setState({
      curIndex: this.state.curIndex + 1,
    });
  };

  _keyContentExtractor = (item, index) => index.toString() + 'content';
  _keyChapterExtractor = (item, index) => index.toString() + 'chapter';

  _renderEmpty = () => {
    return (
      <View>
        <Text>无数据</Text>
      </View>
    );
  };

  _renderItem = ({item, index}) => {
    console.log(item, index);
    return (
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'blue',
          flex: 1,
        }}
        key={index}>
        {this.renderContent(item)}
      </View>
    );
  };

  _renderFooter = () => {
    return null;
  };

  _separator = () => {
    // 再刷新or加载的时候进行的动画或者文字效果
    return <View style={{height: 1}} />;
  };

  renderChapter() {
    let that = this;
    return (
      <View
        style={{
          // backgroundColor: 'pink',
          position: 'relative',
          flex: 1,
        }}>
        {this.state._data.map(function(item, index) {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: '#E9DFC7',
                position: 'absolute',
                top: 0,
                left: 0,
                width: Util.size.width - 20,
                height: Util.size.height - 60,
                zIndex: 999 - index,
              }}
              key={index}>
              {that._renderItem({item, index})}
            </View>
          );
        })}
        <View style={styles.foot}>{this._renderBottomInfo()}</View>
      </View>
    );
  }

  _renderContentItem = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: Spaces[this.state.curSpaceInt],
          // backgroundColor: 'pink',
          flexWrap: 'nowrap',
        }}>
        <Text
          style={{
            color: '#604733',
            fontSize: this.state.curFontSize,
            // backgroundColor: 'green',
            fontFamily: 'simkai',
          }}
          key={index}>
          {item}
        </Text>
      </View>
    );
  };

  // 渲染内容
  renderContent = rowData => {
    console.log('rowData', rowData);
    return (
      <View style={styles.contentContainer}>
        <View style={styles.topBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.showReaderOptions()}>
              <View style={styles.topMenuBox}>
                <Icon
                  name="align-justify"
                  type="feather"
                  color="#A69673"
                  size={14}
                />
                <Text style={{marginLeft: 5, color: '#A69673', fontSize: 12}}>
                  菜单
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{marginLeft: 20}}>
              <Text style={styles.chapterName}>{rowData.title}</Text>
            </View>
          </View>
          <View style={{marginRight: 10}}>
            <TouchableOpacity>
              <Icon
                name="bitcoin-circle"
                type="foundation"
                color="#A69673"
                size={28}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.chapterContent}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={rowData.content}
            extraData={this.state}
            renderItem={this._renderContentItem}
            keyExtractor={this._keyContentExtractor}
            numColumns={1}
            flashScrollIndicators={true}
          />
        </View>
      </View>
    );
  };

  _renderBottomInfo = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
        }}>
        <View style={styles.footLeft}>
          <Battery
            type={'nogrid'}
            size={20}
            percent={this.state.batteryLevel}
            color={'#948A6B'}
          />
          <Text
            style={{
              marginLeft: 3,
              fontSize: 12,
              color: '#A58F72',
            }}>
            {this.state.curTime}
          </Text>
        </View>
        <View>
          <Text style={{color: '#9E9474', fontSize: 12}}>
            提醒：请勿向他人泄露银行卡信息
          </Text>
        </View>
        <View style={styles.footRight}>
          <Text
            style={{
              fontSize: 12,
              color: '#A58F72',
            }}>
            本章进度100%
          </Text>
        </View>
      </View>
    );
  };

  onScroll = xx => {
    console.log(xx);
  };

  onScrollBeginDrag = ({nativeEvent}) => {
    console.log('start', nativeEvent);
  };

  onScrollEndDrag = ({nativeEvent, currentTarget, eventPhase}) => {
    console.log('end', nativeEvent, currentTarget, eventPhase);
  };

  _renderCon = () => {
    let data = this._data;
    console.log('item', data);

    let item = data[this.state.curIndex];
    console.log('item', item);
    return (
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'blue',
          flex: 1,
        }}
        {...this._panResponder.panHandlers}>
        {this.renderContent(item)}
      </View>
    );
  };

  render() {
    return (
      <Provider>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={'#3B3A38'}
            translucent={true}
            hidden={this.state.hideStatusBar}
            animated={true}
            barStyle="light-content"
          />
          {this.renderChapter()}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: 'STKAITI',
  },
  container: {
    flex: 1,
    backgroundColor: '#E9DFC7',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
    // width: Util.size.width,
    // flexWrap: 'wrap',
  },
  topBox: {
    width: Util.size.width - 20,
    marginTop: 30,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topMenuBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4BA90',
    paddingTop: 3,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
  },
  chapterContent: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    // backgroundColor: 'red',
  },
});
export default Book;
