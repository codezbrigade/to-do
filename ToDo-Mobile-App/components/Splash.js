import React, { useEffect, useRef } from 'react';
import { Animated, View, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants';

const Splash = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      progress,
      { toValue: 1, duration: 3000, useNativeDriver: false }
    ).start()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <View style={styles.loadingContainer}>
        <Animated.View style={[
          styles.loading,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%']
            })
          }
        ]} />
      </View>
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
  loadingContainer: {
    height: '1.5%',
    width: '80%',
  },
  loading: {
    borderRadius: 10,
    height: '100%',
    backgroundColor: COLORS.main
  }
})