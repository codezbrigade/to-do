import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants';

const Splash = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Text>Hello This will be the Loading splash  screen</Text>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})