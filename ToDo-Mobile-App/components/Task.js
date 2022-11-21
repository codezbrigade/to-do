import React from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FONTS, COLORS, todoKey } from '../constants';

import { CircularButton } from './Buttons';
import Label from './Label';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import DateTime from './DateTime';

import { SheetManager } from 'react-native-actions-sheet';

const Task = ({ item, setToDoList, setTimeUp }) => {

  const { title, subTitle, time, isCompleted, label_category, label_color } = item;

  const newTitle = title.length > 18 ? title.slice(0, 17) + '...' : title;

  const { getItem, setItem } = useAsyncStorage(todoKey);

  const changeIsCompleted = async () => {
    // setTimeUp(false);

    let data = await getItem();
    let jsonValue = JSON.parse(data);

    let find = jsonValue.find(obj => obj.id === item.id);
    let idx = jsonValue.indexOf(find);
    // console.log(find)
    jsonValue[idx]['isCompleted'] = !isCompleted;

    await setItem(JSON.stringify(jsonValue));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToDoList(jsonValue);
  }

  const preview = () => SheetManager.show('preview', { payload: { item, setToDoList } })

  return (
    <View style={[styles.taskContainer]}>
      <TouchableOpacity onPress={preview} style={styles.details}>

        <Label label={{ label_category, label_color }} />

        <View style={styles.sub}>
          <Text style={{ ...styles.title, textDecorationLine: isCompleted ? 'line-through' : '' }}>
            {newTitle}
          </Text>
          <DateTime time={time} />
        </View>

      </TouchableOpacity>

      <View style={styles.isCompleted}>
        <CircularButton
          borderWidth={1}
          handlePress={changeIsCompleted}
          isCompleted={isCompleted}
        />
      </View>

    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  taskContainer: {
    height: hp(8.64),
    width: '100%',
    marginVertical: hp(1.32),
    // elevation: 4,
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  details: {
    width: '70%',
  },
  sub: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: FONTS.RobotoLight_300,
    fontSize: 20,
    lineHeight: hp(3.27),
    paddingRight: '2%',
    width: '80%',
  },
  subTitle: {
    fontFamily: FONTS.SignikaLight,
    fontSize: 12,
    color: COLORS.sub_title
  },
  isCompleted: {
    paddingHorizontal: wp(4.73),
    width: '10%'
  }
});