import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { RFValue } from 'react-native-responsive-fontsize';

// import { Notification } from "expo-notifications";
// import { NOTIFICATIONS } from 'expo-permissions';

const Heading = () => {

  // useEffect(() => {
  // const registerForPushNotificationsAsync = async () => {
  // const { status } = await NOTIFICATIONS
  // }
  // }, [])

  return (
    <View style={styles.headingContainer}>
      <Text style={styles.heading}>TO_DO</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  headingContainer: {
    width: '100%',
    marginVertical: hp(1.8),
    // borderWidth: 1
  },
  heading: {
    fontSize: RFValue(32),
    fontFamily: FONTS.LeelawadeeUI,
    lineHeight: hp(6),
    fontWeight: '700',
    color: COLORS.main
  }
})