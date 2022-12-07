import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { RFValue } from 'react-native-responsive-fontsize';
import Label from './Label';
import { asserts, COLORS, FONTS, ROUTES, todoKey } from '../constants';
import { RectButton } from './Buttons';
import DoNotRepeat from './DoNotRepeat';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

const HEIGHT = Dimensions.get('screen').height;
// const WIDTH = Dimensions.get('screen').width;

const Preview = ({ route }) => {
  const [todo, setTodo] = useState(null);
  const { getItem, setItem } = useAsyncStorage(todoKey);
  const navigation = useNavigation();

  if (!route.params) return;

  useEffect(() => {
    setTodo(route.params.item);
  }, [route]);

  const handleToggle = (bool) => setTodo({ ...todo, do_not_repeat: bool });

  const deleteItem = async () => {      //delete todo

    let data = await getItem();
    let jsonValue = JSON.parse(data);

    await Notifications.cancelScheduledNotificationAsync(todo.id);

    let filteredList = jsonValue.filter(obj => obj.id !== todo.id);

    await setItem(JSON.stringify(filteredList));

    navigation.navigate(ROUTES.home_screen, [...filteredList]);
  };

  return todo && (
    <View style={styles.previewContainer}>
      <View style={styles.innerContainer}>
        <Label label={{ label_category: todo.label_category, label_color: todo.label_color }} />
        <View style={styles.title_time}>
          <Text style={styles.title}>{todo.title}</Text>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.date}>{todo.time}</Text>
            <Image
              source={asserts.calenderLogo}
              style={{ height: 20, width: 20, marginTop: '5%', marginLeft: '3%' }}
              resizeMode='contain'
            />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.details}>{todo.subTitle}</Text>
        </View>
        <View style={styles.btnGroup}>
          <RectButton
            title={'Edit'}
            backgroundColor={'blue'}
            handlePress={() => navigation.navigate(ROUTES.new_task_screen, { item: todo })}
          />
          <RectButton
            title={'Delete'}
            backgroundColor={'red'}
            handlePress={deleteItem}
          />
        </View>
        {/*        <CircularButton
          imageUrl={asserts.closeBtn}
          imgSize={26}
          position={'absolute'}
          right={0}
          handlePress={() => navigation.goBack()}
  />*/}
      </View>
      <DoNotRepeat handleToggle={handleToggle} switchBool={todo.do_not_repeat} />
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
  previewContainer: {
    height: HEIGHT * 0.7,
    width: '100%',
    marginTop: hp(1.5), //12
    borderRadius: 16,
    backgroundColor: COLORS.previewBg,
    paddingVertical: hp(2),//16,
    alignItems: 'center',
    borderWidth: 1,
  },
  innerContainer: {
    height: '85%',
    width: '85%',
    // borderWidth: 1
  },
  title_time: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.previewContainerBorder,
    paddingTop: '3%',
  },
  title: {
    width: '100%',
    fontFamily: FONTS.LatoRegular,
    fontWeight: '400',
    fontSize: 32,
    lineHeight: 38.4
  },
  dateTimeContainer: {
    flexDirection: 'row'
  },
  date: {
    fontSize: RFValue(14),
    lineHeight: hp(2.42),
    fontFamily: FONTS.RobotoRegular_400,
    paddingVertical: '5%',
  },
  descriptionContainer: {
    // borderWidth: 1
  },
  description: {
    paddingVertical: '4%',
    fontSize: 18,
    lineHeight: 21.09,
    fontFamily: FONTS.RobotoRegular_400,
  },
  details: {
    textAlign: 'justify',
    fontSize: RFValue(14),
    lineHeight: 19.2,
    fontFamily: FONTS.RobotoRegular_400,
    color: COLORS.inActiveHeader
  },
  btnGroup: {
    flex: 1,
    marginTop: '18%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  }
});