import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FONTS, categoryLogoMap } from '../constants';

const Label = ({ label }) => {
  const { label_category, label_color } = label;

  // console.log(label_color, "component");

  return (
    <View style={[styles.container, { backgroundColor: label_color }]}>
      <Image
        style={{ height: 15, width: 15, marginRight: 4 }}
        resizeMode='contain'
        source={categoryLogoMap[label_category]}
      />
      <Text style={styles.category}>{label_category}</Text>
    </View>
  );
};

export default Label;


const styles = StyleSheet.create({
  container: {
    height: 31, width: 126,
    position: 'absolute',
    left: -35,
    top: 15, transform: [
      { rotate: "315deg" }
    ],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    fontFamily: FONTS.LatoRegular,
    fontWeight: '400',
    fontSize: 10,
    color: '#fff'
  }
})