import React from 'react';
import { Image, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, FONTS } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const SectionHeader = ({ string, value, setSelectedHeader }) => {

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedHeader(string);
  }
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.listHeader, value === string && { backgroundColor: COLORS.main }]}
    >
      <Text style={[styles.text, value === string && { color: COLORS.white }]}>
        {string}
      </Text>

    </TouchableOpacity>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  listHeader: {
    width: wp(39.7),
    height: hp(5),
    backgroundColor: COLORS.white,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: FONTS.LatoRegular,
    fontWeight: '400',
    fontSize: 18,
    lineHeight: hp(2.87)
  }
})



// {
//   imageUrl && <Image source={imageUrl}
//     style={styles.image}
//     resizeMode='contain'
//   />
// }