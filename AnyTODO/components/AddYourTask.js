import React, { useLayoutEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, asserts, FONTS, strings } from '../constants';

import image01 from '../asserts/images/image01.png';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';


const AddYourTask = ({ handlePress, selectedHeader }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  let str = selectedHeader !== strings.completed ? strings.add_your_task : strings.no_task_completed;

  useLayoutEffect(() => {
    if (opacity) opacity.setValue(0);

    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: false
    }).start();

    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [selectedHeader]);

  if (selectedHeader !== strings.completed) {
    return (
      <Animated.View style={{ opacity }}>
        <Pressable
          dataTest='others'
          onPress={handlePress}
          style={({ pressed }) => [styles.logoCotainer, pressed && styles.opacity]}
        >
          <Image source={image01} style={styles.image01} />
          <Text dataTest='others' style={styles.text1}>{strings.add_your_task}</Text>
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.textContainer}>
        <Text dataTest='completed' style={styles.text}>{str}</Text>
      </View>
      <View style={{ width: wp(3.6) }}>
        {
          selectedHeader !== strings.completed && <TouchableOpacity onPress={handlePress}>
            <Image source={asserts.plus} style={styles.img} />
          </TouchableOpacity>
        }
      </View>
    </Animated.View>
  );
};

export default AddYourTask;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(6.64),
    backgroundColor: COLORS.white,
    borderRadius: 16,
    // elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  img: {
    height: 15,
    width: 15
  },
  text: {
    // textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS.LatoRegular
  },
  textContainer: {
    width: '65%',
    paddingLeft: '2%'
  },
  image01: {
    height: 190,
    width: 215,
    resizeMode: 'contain',
  },
  text1: {
    textAlign: 'center',
    position: 'absolute',
    bottom: '3%',
    fontFamily: FONTS.RobotoRegular_400,
    fontSize: 12,
    lineHeight: 14.06,
    color: COLORS.white,
    alignSelf: 'center',
  },
  logoCotainer: {
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.6
  }
});
