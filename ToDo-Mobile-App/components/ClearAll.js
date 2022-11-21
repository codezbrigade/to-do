import React from 'react';
import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { strings, COLORS, FONTS, todoKey } from '../constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const ClearAll = ({ setToDoList }) => {

  const { setItem, getItem } = useAsyncStorage(todoKey);

  const handlePress = async () => {

    let data = await getItem();
    let jsonValue = JSON.parse(data);
    if (!jsonValue.length) return;

    let filteredList = jsonValue.filter(obj => obj.isCompleted === false);

    await setItem(JSON.stringify(filteredList));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToDoList(filteredList);
  }

  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={handlePress} >
        <Text style={styles.text}>{strings.clearAll}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClearAll;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(2),
    alignItems: 'flex-end',
    position: 'absolute',
    top: -hp(1.3)
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.LatoRegular,
    fontWeight: '800',
    lineHeight: hp(2.5)
  }
})