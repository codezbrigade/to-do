import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { HEADERS } from '../constants';
import SectionHeader from './SectionHeader';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';


// console.log(hp(2.4))

const Headers = ({ selectedHeader, setSelectedHeader }) => {

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.headers}>
        {
          HEADERS.map((obj, idx) =>
            <SectionHeader
              string={obj.title}
              idx={idx}
              key={idx}
              value={selectedHeader}
              setSelectedHeader={setSelectedHeader}
            />)
        }
      </ScrollView>
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  headers: {
    flexDirection: 'row',
    width: '100%',
    overflow: 'visible'
    // zIndex: 1
  },
})