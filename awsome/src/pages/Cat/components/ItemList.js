//商品列表

'use strict';


import {StyleSheet, Text, Image, View, FlatList} from 'react-native';
import ItemCell from './ItemCell';

// 组件样式
var styles = StyleSheet.create({
  loading: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 21,
    resizeMode: Image.resizeMode.contain,
  },
  listView: {
    // backgroundColor : '#ffffff'
  },
});

var API =
  'http://ald.taobao.com/recommend.htm?appId=03507&areaId=330100&size=15&page=1&type=1';

class ItemList extends React.Component {
  //object在组件被挂载之前调用。状态化的组件应该实现这个方法，返回初始的state数据。
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loaded: false,
    }
  }

  //只调用一次，在render之后调用
  componentDidMount() {
    this.fetchData();
  }

  //render 之前调用
  //之所以取nextProps的值而不直接取this.props.cateId 是因为componentWillReceiveProps的更新早于props的更新
  componentWillReceiveProps(nextProps) {
    //猫头先转
    this.setState({
      loaded: false,
    });
    //拉取数据
    this.fetchData(nextProps.cateId);
  }

  //拉取数据
  fetchData(cateId) {
    var apiUrl = cateId ? API + '&catId=' + cateId : API;
    // console.log(cateId,apiUrl,'api')
    fetch(apiUrl)
      .then(response => response.json())
      .then(responseData => {
        // console.log('responseData',responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true,
        });
      })
      .done();
  }

  //渲染列表
  renderListView() {
    //先展示加载中的菊花
    if (!this.state.loaded) {
      return <Image style={styles.loading} source={require('image!loading')} />;
    }
    return (
      <FlatList
        contentInset={{top: -64}}
        data={this.state.dataSource}
        renderItem={this.renderItem}
        style={styles.listView}
      />
    );
  },

  //渲染每一行
  renderItem({item, index}) {
    return <ItemCell item={item} onSelect={() => item} />;
  },

  render() {
    return this.renderListView();
  },
});
