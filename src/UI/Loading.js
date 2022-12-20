import React, {useEffect, useRef} from 'react';
import {
  Animated,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Easing,
} from 'react-native';
import {COLORS} from '../constants';

const Loading = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
          easing: Easing.exp,
          delay: 300,
        }),
      ]),
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <View style={styles.loadingContainer}>
        <Animated.View
          style={[
            styles.loading,
            {
              // left: '50%'
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    height: '1.5%',
    width: '85%',
    overflow: 'hidden',
  },
  loading: {
    borderRadius: 10,
    height: '100%',
    backgroundColor: COLORS.main,
  },
});
