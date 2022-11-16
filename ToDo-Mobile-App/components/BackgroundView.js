import React from 'react';
import { StyleSheet, ImageBackground, StatusBar, View } from 'react-native';

import { asserts, COLORS } from '../constants';

const BackgroundView = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar animated={true} barStyle='dark-content' backgroundColor={COLORS.statusBar} />
      <ImageBackground source={asserts.bgimg} resizeMode="cover" style={styles.image}>
        {children}
      </ImageBackground>
    </View>
  );
};

export default BackgroundView;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%'
  },
  image: {
    height: '100%',
    width: '100%'
  }
});