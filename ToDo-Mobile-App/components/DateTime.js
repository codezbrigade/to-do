import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { asserts, FONTS } from '../constants';

const DateTime = ({ time }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: 'center' }}>
      <Image
        source={asserts.calender}
        style={styles.image}
        resizeMode='contain' />
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  time: {
    fontFamily: FONTS.SignikaLight,
    fontSize: 12,
  },
  image: {
    height: 20,
    weight: 20,
    marginRight: 5,
    marginBottom: 2
  }
})