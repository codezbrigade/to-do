import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, Pressable, View, Animated } from 'react-native';

import { COLORS, FONTS } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
// import { RFValue } from 'react-native-responsive-fontsize';

const SectionHeader = ({ string, value, setSelectedHeader, idx }) => {

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (string === value.title) {
      Animated.timing(animation, { toValue: 1, useNativeDriver: false }).start()
    } else {
      Animated.timing(animation, { toValue: 0, useNativeDriver: false }).start()
    }
  }, [value])

  const bgColorChanger = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.white, COLORS.main]
    })
  }

  const handlePress = () => {
    setSelectedHeader({ ...value, title: string, id: idx });
  }

  return (
    <Pressable
      onPress={handlePress}
    >
      <Animated.View
        style={[styles.container, bgColorChanger]}
      >
        <Text style={[value.id === idx ? styles.activeText : styles.inActiveText]}>
          {string}
        </Text>

      </Animated.View>
    </Pressable>

  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(2),
    height: hp(4),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeText: {
    paddingHorizontal: wp(4.2),
    fontFamily: FONTS.RobotoMedium_500,
    fontSize: 16,
    lineHeight: hp(2.4),
    color: COLORS.white
  },
  inActiveText: {
    paddingHorizontal: wp(4.2),
    fontFamily: FONTS.RobotoRegular_400,
    fontSize: 16,
    lineHeight: hp(2.4),
    color: COLORS.inActiveHeader
  }
})