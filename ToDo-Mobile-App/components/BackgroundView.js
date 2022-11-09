import React from 'react';
import { StyleSheet, ImageBackground, StatusBar, SafeAreaView } from 'react-native';

import { asserts, COLORS } from '../constants';

const BackgroundView = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle='dark-content' backgroundColor={COLORS.statusBar} />
      <ImageBackground source={asserts.bgimg} resizeMode="cover" style={styles.image}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default BackgroundView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  }
});