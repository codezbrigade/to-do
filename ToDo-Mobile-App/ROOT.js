import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import Home from './screens/Home';
import NewTask from './screens/NewTask';
import * as SplashScreen from 'expo-splash-screen';
import { Splash } from './components';
import { LayoutAnimation } from 'react-native';

// import NotificationComponent from './utils/NotificationComponent';
import Details from './screens/Details';

import { SheetProvider } from 'react-native-actions-sheet';
import './utils/sheets';
// import { RAPID_API } from './api/rapidApi';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const ROOT = () => {

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animate) {
      setTimeout(() => { setAnimate(false) }, 3000);
    }
  }, [animate])

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
        console.log(fontsLoaded, "Hide splash screen")
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setAnimate(true);
        await SplashScreen.hideAsync();
      };
    }
    prevent();
  }, [fontsLoaded]);

  // useEffect(() => {
  //   (async () => {
  //     let res = await RAPID_API();
  //     console.log(res, "rapid api request")
  //   })()
  // }, [])


  if (!fontsLoaded) return null;

  if (animate) return (<Splash />)

  return (
    <NavigationContainer>
      <SheetProvider>
        <Stack.Navigator
          // initialRouteName='NewTask'
          initialRouteName='Home'
          // initialRouteName='Details'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="NewTask" component={NewTask} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </SheetProvider>
    </NavigationContainer>
  );
};

export default ROOT;