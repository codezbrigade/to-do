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
    fontFamily: FONTS.RobotoRegular_400,
    fontSize: 12,
    lineHeight: hp(1.98)
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 8
  }
})