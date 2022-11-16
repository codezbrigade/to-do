import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import checked from '../asserts/images/checked.png';
import { FONTS, strings, COLORS } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export const CircularButton = ({ handlePress, imageUrl, height, width, borderWidth, position, isCompleted, imgSize, ...props }) => {
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
        ...props
      }}>
      {
        isCompleted && !imageUrl ?
          <Image source={checked} resizeMode='contain' style={{ height: 10, width: 14, opacity: 0.9 }} />
          :
          <Image source={imageUrl} resizeMode='cover' style={{ height: imgSize || 27, width: imgSize || 27 }} />
      }
    </TouchableOpacity>

  );
};

export const RectButton = ({ handlePress, ...props }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={{ ...styles.recBtnContainer, ...props }}>
      <Text style={styles.save}>{strings.save}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recBtnContainer: {
    position: 'absolute',
    borderRadius: 16,
    height: 40,
    width: 150,
    backgroundColor: '#0295D5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  save: {
    fontFamily: FONTS.LatoRegular,
    fontWeight: '400',
    fontSize: 18
  }
})