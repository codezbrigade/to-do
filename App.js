import React, {useEffect, useState} from 'react';
// import {Alert} from 'react-native';
import {countKey, ratingKey, appUrl} from './src/constants';
import {GlobalStoreProvider} from 'react-native-global-store';
import './src/utils/sheets';

import ROOT from './ROOT';
import Loading from './src/UI/Loading';

// import messaging from '@react-native-firebase/messaging';

import PushNotification from 'react-native-push-notification';

PushNotification.removeAllDeliveredNotifications();

const myInitialGlobalState = {
  [countKey]: 0,
  [ratingKey]: 0,
  isFirstTime: true,
  appUrl,
  authenticatedToken: null,
  FCM_TOCKEN: '',
};
const App = () => {
  // const [initialState, setInitialState] = useState(myInitialGlobalState);

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   console.log('Authorization status:', authStatus);
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //   return enabled;
  // }

  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     messaging()
  //       .getToken()
  //       .then(FCMToken => {
  //         console.log(FCMToken, 'FCM TOKEN GENERATED');
  //         setInitialState({...initialState, FCM_TOCKEN: FCMToken});
  //       });
  //   } else console.log('Not athurized');

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     // navigation.navigate(remoteMessage.data.type);
  //   });

  //   messaging()
  //     .getInitialNotification()
  //     .then(async remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'getInitialNotification:' +
  //             'Notification caused app to open from quit state',
  //         );
  //         console.log(remoteMessage);
  //         // Alert.alert(
  //         //   'getInitialNotification: Notification caused app to' +
  //         //     'open from quit state',
  //         // );
  //       }
  //     });

  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });
  // }, []);

  // useEffect(() => {
  //   registerAppWithFCM();
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });
  //   return unsubscribe;
  // }, []);
  // async function registerAppWithFCM() {
  //   await messaging().registerDeviceForRemoteMessages();
  // }

  return (
    <GlobalStoreProvider
      initialState={myInitialGlobalState}
      loadingUI={<Loading />}
      persistedKeys={[
        countKey,
        ratingKey,
        'isFirstTime',
        'authenticatedToken',
      ]}>
      <ROOT />
    </GlobalStoreProvider>
  );
};

export default App;
