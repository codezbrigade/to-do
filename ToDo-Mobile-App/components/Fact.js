import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

let temp = "After the Eiffel Tower was built, one person was killed ";

const Fact = () => {

  return (
    <View style={styles.container}>

      <Text style={styles.text}>
        {temp}
      </Text>

    </View>
  );
};

export default Fact;

const styles = StyleSheet.create({
  container: {
    height: hp(2.9),
    width: '100%',
    justifyContent: 'center',
    backgroundColor: COLORS.api,
    borderRadius: 6,
    paddingHorizontal: 10
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS.LatoRegular,
    fontWeight: '300',
    lineHeight: hp(2.5),
    color: COLORS.apiFont
  }
})