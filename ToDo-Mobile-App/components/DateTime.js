import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { asserts, COLORS, FONTS } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const DateTime = ({ time }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.time}>{time.split(' ').slice(3).join(' ').toLocaleLowerCase()}</Text>
    </View>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.time,
    borderRadius: 6
  },
  time: {
    fontFamily: FONTS.SignikaLight,
    fontSize: 10,
    color: COLORS.time,
    lineHeight: hp(1.63),
    padding: 5
  },
  image: {
    height: 20,
    weight: 20,
    marginRight: 5,
    marginBottom: 2
  }
})