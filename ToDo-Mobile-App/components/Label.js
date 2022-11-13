import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FONTS, categoryLogoMap, COLORS } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Label = ({ label }) => {
  const { label_category, label_color } = label;

  return (
    <View style={[styles.container]}>
      <View style={[styles.dot, { backgroundColor: label_color }]} />
      <Text style={[styles.category, { color: label_color }]}>{label_category}</Text>
    </View>
  );
};

export default Label;


const styles = StyleSheet.create({
  container: {
    height: hp(3.46),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  category: {
    fontFamily: FONTS.RobotoLight_300,
    fontSize: 12,
    color: COLORS.white,
    lineHeight: hp(1.98)
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    marginRight: 8
  },
  image: {
    height: 15,
    width: 15,
    marginRight: 4
  }
})