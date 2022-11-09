import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HEADERS } from '../constants';
import SectionHeader from './SectionHeader';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const Headers = ({ selectedHeader, setSelectedHeader }) => {

  return (
    <View style={styles.headers}>
      {
        HEADERS.map((obj, idx) =>
          <SectionHeader
            string={obj.title}
            key={idx}
            value={selectedHeader}
            setSelectedHeader={setSelectedHeader}
          />)
      }
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  headers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    height: hp(11.4),
    width: '100%',
    marginVertical: hp(4.7)
  },
})