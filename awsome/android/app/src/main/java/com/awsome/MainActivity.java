package com.awsome;


import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.ContactsContract;
import com.facebook.react.ReactActivity;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

// import com.awsome.module.DemoShareModule;

import com.awsome.module.UmengPushModule;
import com.awsome.module.UmengShareModule;

import com.umeng.analytics.MobclickAgent;
import com.umeng.socialize.UMShareAPI;
import com.umeng.message.PushAgent;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      // 分享
      // DemoShareModule.initActivity(this);
      // 友盟统计
      MobclickAgent.setSessionContinueMillis(1000*40);
      // 友盟推送
      UmengPushModule.initPushSDK(this);
      PushAgent.getInstance(this).onAppStart();
      // 友盟分享
      UmengShareModule.initSocialSDK(this);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "awsome";
  }


  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
      super.onActivityResult(requestCode, resultCode, data);
      if (requestCode != 1 || requestCode != RESULT_OK) return;

      Uri contactData = data.getData();
      Cursor cursor = getContentResolver().query(
              ContactsContract.Contacts.CONTENT_URI, null, null, null, null);

      cursor.moveToFirst();

      String[] phoneResult = this.getContactPhone(cursor);

      if (phoneResult.length > 0) {
          MainApplication.getMyMainPackage().getMyMainModule().sendMsgToRn(phoneResult[0], phoneResult[1] );
      }

      // 分享
      // UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);

      // 友盟分享
      UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
  }

  /**
   * 参数: Cursor cursor; 指定游标
   * 功能:　从指定游标中取出联系人姓名和电话，并且返回
   * 返回值：　String[] 0位置是联系人姓名 1位置是联系人电话
   */
  private String[] getContactPhone(Cursor cursor) {

      int phoneColumn = cursor.getColumnIndex(ContactsContract.Contacts.HAS_PHONE_NUMBER);
      int phoneNum = cursor.getInt(phoneColumn);
      // 最终要返回的String数组
      String[] phoneResult = new String[2];
      if (phoneNum > 0) {
          // 获得联系人的ID号
          int idColumn = cursor.getColumnIndex(ContactsContract.Contacts._ID);
          String contactId = cursor.getString(idColumn);
          // 获得联系人的电话号码的cursor;
          Cursor phones = getContentResolver().query(
                  ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                  null,
                  ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = " + contactId,
                  null, null);
          if (phones.moveToFirst()) {
              // 遍历所有的电话号码
              for (; !phones.isAfterLast(); phones.moveToNext()) {// 得到选定联系人的号码
                  String phoneNumber = phones.getString(phones.getColumnIndex(ContactsContract.CommonDataKinds.Phone.TYPE));
                  // 得到选定联系人的名字
                  String phoneName = phones.getString(phones.getColumnIndex(ContactsContract.PhoneLookup.DISPLAY_NAME));
                  phoneResult[1] = phoneNumber;
                  phoneResult[0] = phoneName;
              }
              // 最后 要关闭Cursor
              if (!phones.isClosed()) {
                  phones.close();
              }
          }
      }
      return phoneResult;
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }

  @Override
  protected void onDestroy() {
      super.onDestroy();
      // 解决内存泄漏问题
      // UMShareAPI.get(this).release();
      // 友盟
      //MobclickAgent.onKillProcess(this);
  }

  @Override
  public void onResume() {
      super.onResume();
      // 友盟
      MobclickAgent.onResume(this);
  }
  @Override
  protected void onPause() {
      super.onPause();
      // 友盟
      MobclickAgent.onPause(this);
  }
}
