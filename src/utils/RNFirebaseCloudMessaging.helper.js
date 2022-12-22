import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  console.log('Authorization status:', authStatus);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  // return enabled;
  let fcmtoken;
  if (enabled) {
    await messaging().registerDeviceForRemoteMessages();
    fcmtoken = await messaging().getToken();
  } else {
    console.log('notification acces denied');
  }
  console.log('fcmtoken is : ', fcmtoken);
  AsyncStorage.setItem('fcmtoken', fcmtoken);
}

export const notificationListener = () => {
  //Triggered when the notification is opened
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  //Foreground state messages
  messaging().onMessage(async remoteMessage => {
    console.log(
      'A new FCM message arrived jeya!',
      JSON.stringify(remoteMessage?.notification.android.imageUrl),
    );
  });

  // Check whether an initial notification is available
  const unsubscribe = messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        //  setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });

  return unsubscribe;
};
