import React, {useEffect, useState} from 'react';
// import {Alert} from 'react-native';
import {countKey, ratingKey, appUrl} from './src/constants';
import {GlobalStoreProvider} from 'react-native-global-store';
import './src/utils/sheets';

import ROOT from './ROOT';
import Loading from './src/UI/Loading';

// import messaging from '@react-native-firebase/messaging';

import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import {createLocalChanel} from './src/utils/RNPushNotification.helper';
import {
  requestUserPermission,
  notificationListener,
} from './src/utils/RNFirebaseCloudMessaging.helper';

RNBootSplash.hide({fade: true, duration: 500});

const myInitialGlobalState = {
  [countKey]: 0,
  [ratingKey]: 0,
  isFirstTime: true,
  appUrl,
};

const App = () => {
  useEffect(() => {
    createLocalChanel();
    requestUserPermission();
    notificationListener();
  }, []);

  return (
    <GlobalStoreProvider
      initialState={myInitialGlobalState}
      loadingUI={<Loading />}
      persistedKeys={[countKey, ratingKey, 'isFirstTime']}>
      <NavigationContainer>
        <ROOT />
      </NavigationContainer>
    </GlobalStoreProvider>
  );
};

export default App;
