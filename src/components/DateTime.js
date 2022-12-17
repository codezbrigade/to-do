import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS} from '../constants';

import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DateTime = ({time}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        {time.split(' ').slice(4).join(' ').toLocaleLowerCase()}
      </Text>
    </View>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.sub_title,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  time: {
    fontFamily: FONTS.SignikaLight,
    fontWeight: '300',
    fontSize: 10,
    color: COLORS.sub_title,
    lineHeight: hp(1.63),
  },
  image: {
    height: 20,
    weight: 20,
    marginRight: 5,
    marginBottom: 2,
  },
});
