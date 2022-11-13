import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { BackgroundView, CircularButton, Form, Heading } from '../components';

import { asserts, COLORS, FONTS } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const NewTask = ({ route }) => {

  return (
    <BackgroundView>
      <View style={styles.subHomeContainer}>
        <Heading />
      </View>

      <Form route={route} />

    </BackgroundView>

  );
};

export default NewTask;

const styles = StyleSheet.create({
  subHomeContainer: {
    // height: '99%',
    alignSelf: 'center',
    width: '90%',
    // borderWidth: 1,
  },

})