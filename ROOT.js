import React, {useEffect, useState} from 'react';
import {useGlobalStore} from 'react-native-global-store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SheetProvider} from 'react-native-actions-sheet';
import RNBootSplash from 'react-native-bootsplash';

import Loading from './src/UI/Loading';
import HomeScreen from './src/screens/HomeScreen';
import NewTaskScreen from './src/screens/NewTaskScreen';

import {ROUTES} from './src/constants';
import {FACT_API} from './src/api/apiNinja';
import {createLocalChanel} from './src/utils/RNPushNotification.helper';

const Stack = createNativeStackNavigator();

const ROOT = () => {
  const [globalState, setGlobalState] = useGlobalStore();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    (async () => {
      RNBootSplash.hide({fade: true, duration: 500});
      createLocalChanel();
      await fetchData();
    })();
  }, []);

  const fetchData = async () => {
    setAnimate(true);
    await FACT_API().then(res => {
      setGlobalState({...globalState, facts: res});
      setAnimate(false);
    });
  };

  const screenOptions = {
    headerShown: false,
    animation: 'slide_from_right',
  };

  if (animate) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <SheetProvider>
        <Stack.Navigator
          initialRouteName={ROUTES.home_screen}
          screenOptions={screenOptions}>
          <Stack.Screen name={ROUTES.home_screen} component={HomeScreen} />
          <Stack.Screen
            name={ROUTES.new_task_screen}
            component={NewTaskScreen}
          />
        </Stack.Navigator>
      </SheetProvider>
    </NavigationContainer>
  );
};

export default ROOT;
