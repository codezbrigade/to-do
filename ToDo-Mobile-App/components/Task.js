import React from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { LayoutAnimation, StyleSheet, Text, View } from 'react-native';

import { FONTS, COLORS, todoKey } from '../constants';

import { CircularButton } from './Buttons';
import Label from './Label';

import DateTime from './DateTime';


const Task = ({ item, setToDoList, settimeout }) => {
  const { title, subTitle, time, isCompleted, label_category, label_color } = item;

  const newTitle = title.length > 22 ? title.slice(0, 21) + '...' : title;

  const { getItem, setItem } = useAsyncStorage(todoKey);

  const changeIsCompleted = async () => {
    settimeout(false);

    let data = await getItem();
    let jsonValue = JSON.parse(data);

    let find = jsonValue.find(obj => obj.id === item.id);
    let idx = jsonValue.indexOf(find);

    jsonValue[idx]['isCompleted'] = !isCompleted;

    await setItem(JSON.stringify(jsonValue));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToDoList(jsonValue);
  }

  return (
    <View style={[styles.taskContainer]}>
      <View style={styles.details}>
        <DateTime time={time} />
        <Text style={{ ...styles.title, textDecorationLine: isCompleted ? 'line-through' : '' }}>
          {newTitle}
        </Text>
        <Text style={{ ...styles.subTitle, textDecorationLine: isCompleted ? 'line-through' : '' }}>
          {subTitle}
        </Text>
      </View>

      <View style={styles.isCompleted}>
        <CircularButton
          borderWidth={1}
          handlePress={changeIsCompleted}
          isCompleted={isCompleted}
        />
      </View>

      <Label label={{ label_category, label_color }} />
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  taskContainer: {
    height: 100,
    marginVertical: 10,
    elevation: 4,
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  details: {
    width: '60%',
  },
  title: {
    fontFamily: FONTS.SignikaLight,
    fontSize: 24,
  },
  subTitle: {
    fontFamily: FONTS.SignikaLight,
    fontSize: 12,
    color: COLORS.sub_title
  },
  isCompleted: {
    paddingHorizontal: 20
  }
});