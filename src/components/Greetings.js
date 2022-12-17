import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, strings} from '../constants';

import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {RFValue} from 'react-native-responsive-fontsize';

const Greetings = () => {
  const {morning, evening, afternoon} = strings;
  let now = new Date().getHours();
  let period = now > 12 && now < 17 ? afternoon : now > 16 ? evening : morning;

  return (
    <View style={styles.greetngsContainer}>
      <Text
        style={
          styles.greetings
        }>{`Hey buddy \nWOwhoo! Great ${period} ...`}</Text>
    </View>
  );
};

export default Greetings;

const styles = StyleSheet.create({
  greetngsContainer: {
    width: '100%',
  },
  greetings: {
    fontFamily: FONTS.RobotoMedium_500,
    lineHeight: hp(3.1),
    color: COLORS.greetings,
    fontSize: RFValue(16),
  },
});
