import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import checked from '../asserts/images/checked.png';
import {FONTS, COLORS} from '../constants';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp
// } from 'react-native-responsive-screen';

export const CircularButton = ({
  handlePress,
  imageUrl,
  height,
  width,
  borderWidth,
  position,
  isCompleted,
  imgSize,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        ...styles.container,
        width: width || 20,
        height: height || 20,
        borderWidth: borderWidth ? borderWidth : 0,
        position: position || 'relative',
        backgroundColor: isCompleted ? COLORS.main : COLORS.white,
        ...props,
      }}>
      {isCompleted && !imageUrl ? (
        <Image
          source={checked}
          resizeMode="contain"
          style={{height: 10, width: 14, opacity: 0.9}}
        />
      ) : (
        <Image
          source={imageUrl}
          resizeMode="cover"
          style={{height: imgSize || 27, width: imgSize || 27}}
        />
      )}
    </TouchableOpacity>
  );
};

export const RectButton = ({handlePress, color, title, style, ...props}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[{...styles.recBtnContainer, ...props}, style]}>
      <Text style={[styles.save, {color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.modalBackground,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recBtnContainer: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  save: {
    fontFamily: FONTS.LatoRegular,
    fontWeight: '400',
    fontSize: 18,
    color: 'white',
  },
});
