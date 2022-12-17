import {StyleSheet} from 'react-native';

import {COLORS, FONTS} from '../constants';

import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  headingContainer: {
    marginVertical: hp(1.8),
  },
  heading: {
    fontSize: RFValue(32),
    fontFamily: FONTS.LeelawadeeUI,
    lineHeight: hp(6),
    fontWeight: '700',
    color: COLORS.main,
  },
});
