import React, { useEffect, useState } from 'react';

import { Image, Pressable, Text, TextInput, ToastAndroid, Vibration, View } from 'react-native';

import { CircularButton, RectButton } from './Buttons';
import Category from './Category';
import DoNotRepeat from './DoNotRepeat';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'

import { useNavigation } from '@react-navigation/native';
import { getData, storeData } from '../utils/asyncStorage';

import { strings, asserts, categories, FONTS, todoKey, ROUTES, COLORS } from '../constants';
import { createAlert } from '../utils/Alert';

import { styles } from './Form.styles';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { RFValue } from 'react-native-responsive-fontsize';

import * as Notifications from 'expo-notifications';

const defaultToDo = {
  id: '',
  title: '',
  subTitle: '',
  time: '',
  label_category: '',
  label_color: '',
  do_not_repeat: true,
  isCompleted: false
};

const Form = ({ route, ...props }) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [todo, setTodo] = useState(defaultToDo);

  const [date, setDate] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params) {
      setTodo({ ...todo, ...route.params.item })
      let time = route.params.item.time.split(' ');
      let modified = `${time[1]}-${time[0]}-${time[2]} ${time[4]} ${time[5]}`
      setDate(modified);
    }
  }, [route])

  const handlChange = (name, value) => {
    setTodo((todo) => {
      return {
        ...todo,
        [name]: value
      }
    })
  };

  const handleToggle = (bool) => setTodo({ ...todo, do_not_repeat: bool });

  const onSelectCategory = (category) => {
    let { name: label_category, color: label_color } = category;
    setTodo({ ...todo, label_category, label_color })
  }

  const pressHandle = async () => {
    if (!todo.title || !todo.time) return;

    let jsonValue = await getData(todoKey) || [];

    const trigger = new Date(date);

    if (!todo.id) {
      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: todo.title,
          body: todo.subTitle,
          data: { data: todo.label_category },
        },
        trigger
      })
      // console.log(identifier, "Notification added")

      let toDo = todo;
      toDo.id = identifier;

      await storeData(todoKey, [...jsonValue, toDo])
      setTodo(defaultToDo);
      navigation.navigate(ROUTES.home_screen, [...jsonValue, toDo]);

    } else {
      await Notifications.cancelScheduledNotificationAsync(todo.id);
      // console.log(todo.id, "Notification deleted for editing")

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: todo.title,
          body: todo.subTitle,
          data: { data: todo.label_category },
        },
        trigger
      })
      // console.log(identifier, "Notification Edited")

      let find = jsonValue.find(e => e.id === todo.id)
      let idx = jsonValue.indexOf(find)

      jsonValue[idx] = todo;
      jsonValue[idx]["id"] = identifier;

      await storeData(todoKey, jsonValue)
      setTodo(defaultToDo);
      navigation.navigate(ROUTES.home_screen, jsonValue);
    }

    Vibration.vibrate();

    ToastAndroid.show(
      "TO_DO added successfully",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    )
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateTime) => {
    const time = moment(dateTime).format('MMM D YYYY - hh:mm a');
    const notifi = moment(dateTime).format('D-MMM-YYYY hh:mm a');
    setDate(notifi);
    setTodo({ ...todo, time })
    hideDatePicker();
  };

  return (
    <View style={{ ...styles.form, ...props }}>
      <Text style={styles.title}>{strings.add_task}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.addTitle}
          placeholder={strings.add_title}
          onChangeText={(text) => handlChange('title', text)}
          defaultValue={todo.title}
        />

        <Pressable style={styles.dateInput} onPress={showDatePicker}>
          <TextInput
            style={styles.date}
            placeholder={strings.dateTime}
            defaultValue={todo.time}
            onChangeText={(text) => handlChange('time', text)}
          />
          <Image
            source={asserts.calenderLogo}
            style={{ height: 20, width: 20, marginBottom: 5 }}
            resizeMode='contain'
          />
        </Pressable>
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.subTitleInput}
            placeholder={strings.description}
            defaultValue={todo.subTitle}
            onChangeText={(text) => handlChange('subTitle', text)}
          />
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{strings.category}</Text>
        <View style={styles.categoryList}>
          {
            categories.map((category, idx) =>
              <Category key={idx} handlePress={onSelectCategory} category={category}
                idx={idx} value={todo.label_category}
              />)
          }
        </View>
      </View>

      <DoNotRepeat handleToggle={handleToggle} switchBool={todo.do_not_repeat} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <CircularButton
        position={'relative'}
        top={hp(3.3)}
        // bottom={-70}
        left={wp(28.1)}
        backgroundColor={COLORS.main}
        width={70}
        height={70}
        borderWidth={0}
        imageUrl={asserts.addTask}
        handlePress={pressHandle}
      />

      <CircularButton
        borderWidth={0}
        imageUrl={asserts.close}
        position={'absolute'}
        imgSize={10}
        top={hp(1.57)}
        backgroundColor={'#767676'}
        right={wp(6.9)}
        handlePress={() => navigation.goBack()}
      />

    </View>
  );
};

export default Form;
