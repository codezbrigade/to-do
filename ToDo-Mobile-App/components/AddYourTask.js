import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, asserts, FONTS, strings } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';


const AddYourTask = ({ handlePress, selectedHeader }) => {

  let str = selectedHeader !== strings.completed ? strings.add_your_task : strings.no_task_completed;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{str}</Text>
      </View>
      <View style={{ width: wp(3.6) }}>
        {
          selectedHeader !== strings.completed && <TouchableOpacity onPress={handlePress}>
            <Image source={asserts.plus} style={styles.img} />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default AddYourTask;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(6.64),
    backgroundColor: COLORS.white,
    borderRadius: 16,
    // elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  img: {
    height: 15,
    width: 15
  },
  text: {
    // textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS.LatoRegular
  },
  textContainer: {
    width: '65%',
    paddingLeft: '2%'
  }
})