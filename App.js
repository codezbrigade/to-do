import React from 'react';
import {countKey, ratingKey, appUrl, channel} from './src/constants';
import {GlobalStoreProvider} from 'react-native-global-store';
import './src/utils/sheets';

import ROOT from './ROOT';
import Loading from './src/UI/Loading';

const App = () => {
  const myInitialGlobalState = {
    [countKey]: 0,
    [ratingKey]: 0,
    isFirstTime: true,
    appUrl,
    authenticatedToken: null,
  };

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
