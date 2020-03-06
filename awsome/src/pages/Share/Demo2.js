/**
 * react-native-share/login
 * update by Songlcy 2017-12-02
 */
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import UShare from '../../components/umeng/ShareUtil';
import SharePlatform from '../../components/umeng/SharePlatform';

export default class ReactNativeShare extends Component {
  /**
   * 第三方分享
   * 参数：标题、分享内容、分享链接、图片、平台、分享结果回调
   */
  _share() {
    console.log('分享');
    UShare.share(
      '内容',
      'http://dev.umeng.com/images/tab2_1.png',
      'http://baidu.com',
      '标题',
      SharePlatform.WECHAT,
      message => {
        console.log(message);
        // message: 分享成功、分享失败、取消分享
        // TODO ...
      },
    );
  }

  /**
     * 第三方登录
     * 参数：登录平台、登录结果回调
     *  'userId: ' 用户id
        'accessToken: token
        'userName: ' 用户昵称
        'userGender: ' 用户性别
        'userAvatar: ' 用户头像
     */
  _getUserInfo() {
    console.log('授权登录');
    UShare.auth(SharePlatform.WECHAT, result => {
      // code: 0成功、1失败、2取消
      if (result.code === 0) {
        console.log(
          '授权登录成功:' +
            'userId: ' +
            result.uid +
            'accessToken: ' +
            result.accessToken +
            'userName: ' +
            result.userName +
            'userGender: ' +
            result.userGender +
            'userAvatar: ' +
            result.userAvatar,
        );
      } else {
        // TODO ...
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._share.bind(this)}>
          <Text style={styles.title}>第三方分享</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._getUserInfo.bind(this)}>
          <Text style={styles.title}>第三方登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
