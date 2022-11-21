import React from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants';

const Splash = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Animated.View style={styles.loading} />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    height: 15,
    width: '80%',
    borderWidth: 2
  }
})