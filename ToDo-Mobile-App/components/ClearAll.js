import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { strings, COLORS, FONTS } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const ClearAll = ({ handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container} >
      <Text style={styles.text}>{strings.clearAll}</Text>
    </TouchableOpacity>
  );
};

export default ClearAll;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(2),
    alignItems: 'flex-end',
    position: 'absolute',
    top: -hp(1.3)
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.LatoRegular,
    fontWeight: '800',
    lineHeight: hp(2.5)
  }
})