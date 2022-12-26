/**
 * @format
 */
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import {
  localNotification,
  snoozeActionHandler,
} from './src/utils/RNPushNotification.helper';
import messaging from '@react-native-firebase/messaging';

import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

PushNotification.configure({
  onAction: notification => {
    if (notification.action === 'Done') {
      console.log('done clicked, try out in physical device');
      PushNotification.invokeApp(notification);
    } else {
      PushNotification.removeAllDeliveredNotifications();
      snoozeActionHandler(
        notification.id,
        notification.channelId,
        notification.title,
        notification.bigText,
        notification.message,
        notification.color,
        notification.largeIconUrl,
      );
      console.log('Snoozed for 1min');
    }
  },
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    if (!notification.action)
      localNotification(
        notification?.title,
        notification?.message,
        notification?.largeIconUrl,
        notification?.id,
      );
  },

  onRegistrationError: function (err) {
    console.error(err.message, err, 'unexpected error occured');
  },

  popInitialNotification: true,

  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
