import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import Home from './screens/Home';
import NewTask from './screens/NewTask';
import * as SplashScreen from 'expo-splash-screen';
import { Splash } from './components';
import { LayoutAnimation, Text } from 'react-native';

import { SheetProvider } from 'react-native-actions-sheet';
import './utils/sheets';

import { FACT_API } from './api/apiNinja';

import { GlobalStoreProvider } from "react-native-global-store";

import { appUrl, countKey, ratingKey } from './constants';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const ROOT = () => {

  const [animate, setAnimate] = useState(false);
  const [facts, setFacts] = useState(null);

  const [fontsLoaded] = useFonts({
    InterRegular: require('./asserts/fonts/Inter-Regular.otf'),
    LatoRegular: require('./asserts/fonts/Lato-Regular.ttf'),
    SignikaLight: require('./asserts/fonts/Signika-Light.otf'),
    LeelawadeeUI: require('./asserts/fonts/LeelawUI.ttf'),
    RobotoThin: require('./asserts/fonts/Roboto-Thin.ttf'),       //100 Roboto-LightItalic
    RobotoLight: require('./asserts/fonts/Roboto-Light.ttf'),     //300
    RobotoLightItalic: require('./asserts/fonts/Roboto-LightItalic.ttf'),     //300
    RobotoRegular: require('./asserts/fonts/Roboto-Regular.ttf'), //400
    RobotoMedium: require('./asserts/fonts/Roboto-Medium.ttf'),   //500
    RobotoBold: require('./asserts/fonts/Roboto-Bold.ttf'),       //700
    RobotoBlack: require('./asserts/fonts/Roboto-Black.ttf'),     //900
  });

  useEffect(() => {
    const prevent = async () => {
      if (fontsLoaded) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        await SplashScreen.hideAsync();
      };
    }
    prevent();
  }, [fontsLoaded]);

  useEffect(() => {
    (async () => {
      setAnimate(true);
      await FACT_API().then((res) => {
        setFacts(res);
        setAnimate(false);
      });
    })()
  }, [])

  if (!fontsLoaded) return null;

  if (animate) return (<Splash />)

  const myInitialState = {
    [countKey]: 0,
    [ratingKey]: 0,
    isFirstTime: true,
    appUrl,
  };

  return (
    <>
      <GlobalStoreProvider
        initialState={myInitialState}
        loadingUI={<Splash />}
        persistedKeys={[countKey, ratingKey, "isFirstTime"]}
      >
        <NavigationContainer>
          <SheetProvider>
            <Stack.Navigator
              initialRouteName='Home'
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                // headerBackButtonMenuEnabled: true
              }}
            >
              <Stack.Screen name="Home" component={Home} initialParams={{ facts }} />
              <Stack.Screen name="NewTask" component={NewTask} />
            </Stack.Navigator>
          </SheetProvider>
        </NavigationContainer>
      </GlobalStoreProvider>
    </>
  );
};

export default ROOT;