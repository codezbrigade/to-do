import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Heading = () => {
  return (
    <View style={styles.headingContainer}>
      <Text style={styles.heading}>TO_DO</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  headingContainer: {
    width: '100%',
    marginVertical: hp(3.5),
  },
  heading: {
    fontSize: 36,
    // height: hp(6.3),
    fontFamily: FONTS.LeelawadeeUI,
    lineHeight: hp(6.3),
    fontWeight: '700',
    color: COLORS.main
  }
})