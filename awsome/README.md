

1. Support for the experimental syntax 'decorators-legacy' isn't currently enabled

npm install @babel/plugin-proposal-decorators

安装后再package.json里面加一句话（babel里面plugins那句）：
 "babel": {
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ],
    "presets": [
      "react-app"
    ]
  },
或者在 babel.config.js 加入
  plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]],


2. More than one file was found with OS independent path
在 android/app/build.gradle 中添加配置如下：
android {
    ...
    packagingOptions {
        // exclude ARMEABI native so file, ARMEABI has been removed in NDK r17.
        exclude "lib/armeabi/**"
        pickFirst 'lib/x86/libc++_shared.so'
        pickFirst 'lib/x86_64/libjsc.so'
        pickFirst 'lib/arm64-v8a/libjsc.so'
        pickFirst 'lib/arm64-v8a/libc++_shared.so'
        pickFirst 'lib/x86_64/libc++_shared.so'
        pickFirst 'lib/armeabi-v7a/libc++_shared.so'
    }
    ...
}


3. Error:Cannot fit requested classes in a single dex file.Try supplying a main-dex list.
Error: Cannot fit requested classes in a single dex file (# methods: 149346 > 65536)

1) android/app/build.gradle
android {
  defaultConfig {
    ...
    multiDexEnabled true
    ...
  }

}

dependencies  {
  ...
  implementation 'com.android.support:multidex:1.0.3'
  ...
}

2) android/app/src/main/<PackageName>/MainApplication.java

import androidx.multidex.MultiDex;

@Override
public void onCreate() {
    super.onCreate();
    // 主要是添加下面这句代码
    MultiDex.install(this);
}

4. com.android.builder.testing.api.DeviceException: No connected devices!
未连接虚机或者设备未打开调试
adb connect 127.0.0.1:7555

