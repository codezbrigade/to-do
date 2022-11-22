import React, { useLayoutEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { asserts, COLORS, FONTS } from '../constants';

import { FACT_API } from '../api/apiNinja';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Fact = ({ fact }) => {
  // const [fact, setFacts] = useState('');

  // useLayoutEffect(() => {
  //   (async () => {
  //     const response = await FACT_API();
  //     console.log(response)
  //     // setFacts(response[0]["fact"])
  //   })()
  // }, [])

  return (
    <View style={styles.container}>
      {fact && [
        <Image key={'12'} source={asserts.water} style={styles.image} />,
        <Text key={'13'} style={styles.text}> " {fact} "</Text>
      ]}
    </View>
  );
};

export default Fact;
const styles = StyleSheet.create({
  container: {
    minHeight: '7%',
    marginBottom: hp(3),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingHorizontal: 10,
    backgroundColor: COLORS.factBg,
    borderColor: COLORS.factBorder,
    borderWidth: 1,
    alignItems: 'center'
  },
  image: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    // transform: [{ rotate: '-11 deg' }]
  },
  text: {
    color: COLORS.inActiveHeader,
    width: '90%',
    fontSize: 14,
    fontFamily: FONTS.RobotoLightItalic,
    lineHeight: 16.4, //hp(2.5),
    paddingVertical: 10,
    paddingHorizontal: 8
  }
})