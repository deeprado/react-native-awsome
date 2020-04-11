import CodePush from 'react-native-code-push';
import Loading from './Loading';

function checkUpdate() {
  const options = {
    updateDialog: {
      appendReleaseDescription: true,
      title: '有更新',
      descriptionPrefix: '更新内容：',
      mandatoryContinueButtonLabel: '继续',
      mandatoryUpdateMessage: '必须更新才能继续使用',
      optionalIgnoreButtonLabel: '忽略',
      optionalInstallButtonLabel: '安装',
      optionalUpdateMessage: '有新的版本，你想要安装吗？',
    },
    installMode: CodePush.InstallMode.IMMEDIATE,
  };

  CodePush.sync(options, status => {
    switch (status) {
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.refs.nav.push({
          component: Loading,
          title: ' ',
          navigationBarHidden: true,
          leftButtonTitle: '',
          onLeftButtonPress: () => {},
        });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        break;
    }
  });
}

export default checkUpdate;
