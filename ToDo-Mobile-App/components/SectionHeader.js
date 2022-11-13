import React from 'react';
import { Image, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, FONTS } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { RFValue } from 'react-native-responsive-fontsize';

const SectionHeader = ({ string, value, setSelectedHeader, idx }) => {

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedHeader({ ...value, title: string, id: idx });
  }
  return (
    <TouchableOpacity
      onPress={handlePress}
      // style={[styles.listHeader, value.id === idx && { backgroundColor: COLORS.main }]}
      style={[value.id === idx ? styles.active : styles.inActive]}
    >
      <Text style={[value.id === idx ? styles.activeText : styles.inActiveText]}>
        {string}
      </Text>

    </TouchableOpacity>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  // listHeader: {
  //   width: wp(39.7),
  //   height: hp(5),
  //   backgroundColor: COLORS.white,
  //   borderRadius: 6,
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  // text: {
  //   fontFamily: FONTS.RobotoRegular_400,
  //   fontSize: 18,
  //   lineHeight: hp(2.87)
  // },
  active: {
    marginHorizontal: wp(2),
    height: hp(5.5),
    backgroundColor: COLORS.main,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inActive: {
    height: hp(4),
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: wp(2),
    justifyContent: 'center'
  },
  activeText: {
    paddingHorizontal: wp(2.7),
    fontFamily: FONTS.RobotoMedium_500,
    fontSize: 20,
    lineHeight: hp(3),
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