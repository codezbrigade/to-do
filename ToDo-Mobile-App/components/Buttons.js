import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import checked from '../asserts/images/checked.png';
import { FONTS, strings } from '../constants';

export const CircularButton = ({ handlePress, imageUrl, height, width, borderWidth, position, isCompleted, ...props }) => {

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        ...styles.container,
        width: width || 30,
        height: height || 30,
        borderWidth: borderWidth ? borderWidth : 0,
        position: position || 'relative',
        ...props
      }}>
      {
        isCompleted && !imageUrl ?
          <Image source={checked} resizeMode='contain' style={{ height: 20, width: 20, opacity: 0.9 }} />
          :
          <Image source={imageUrl} resizeMode='cover' style={{ height: 27, width: 27 }} />
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