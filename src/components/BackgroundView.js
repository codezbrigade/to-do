import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  View,
  Dimensions,
} from 'react-native';

import {asserts, COLORS} from '../constants';

const HEIGHT = Dimensions.get('screen').height;
// const WIDTH = Dimensions.get('screen').width;

const BackgroundView = ({children}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        backgroundColor={COLORS.statusBar}
      />
      <ImageBackground
        source={asserts.bgimg}
        resizeMode="cover"
        style={styles.image}>
        {children}
      </ImageBackground>
    </View>
  );
};

export default BackgroundView;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: HEIGHT,
    height: HEIGHT - StatusBar.currentHeight * 2.39,
    width: '100%',
    // borderWidth: 1
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
