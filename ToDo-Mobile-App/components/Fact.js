import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../constants';

import TextTicker from 'react-native-text-ticker';
import { FACT_API } from '../api/apiNinja';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Fact = () => {
  const [facts, setFacts] = useState([]);

  const FACT = facts.join("  |  ");
  const DURATION = 150 * FACT.length;

  useLayoutEffect(() => {
    (async () => {
      const response = await FACT_API();
      const stringArray = response.map(e => e.fact);
      setFacts(stringArray)
    })()
  }, [])

  return (
    <View style={styles.container}>
      <TextTicker
        style={styles.text}
        duration={DURATION}
        loop
        bounce
        repeatSpacer={50}
        marqueeDelay={1000}
      >
        {FACT}
      </TextTicker>
    </View>
  );
};

export default Fact;
const styles = StyleSheet.create({
  container: {
    marginTop: hp(1.26), //to be deleted
    height: hp(2.9),
    width: '100%',
    justifyContent: 'center',
    backgroundColor: COLORS.api,
    borderRadius: 6,
    paddingHorizontal: 10
  },
  text: {
    width: '100%',
    fontSize: 16,
    fontFamily: FONTS.LatoRegular,
    fontWeight: '300',
    lineHeight: hp(2.5),
    color: COLORS.apiFont
  }
})