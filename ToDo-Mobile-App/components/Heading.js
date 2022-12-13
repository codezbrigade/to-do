import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { RFValue } from 'react-native-responsive-fontsize';

const Heading = () => (
  <View style={styles.headingContainer}>
    <Text style={styles.heading}>Any TO_DO</Text>
  </View>
);


export default Heading;

const styles = StyleSheet.create({
  headingContainer: {
    marginVertical: hp(1.8),
  },
  heading: {
    fontSize: RFValue(32),
    fontFamily: FONTS.LeelawadeeUI,
    lineHeight: hp(6),
    fontWeight: '700',
    color: COLORS.main
  }
})