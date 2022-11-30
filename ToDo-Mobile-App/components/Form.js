import React, { useEffect, useRef, useState } from 'react';

import { Animated, Image, KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, ToastAndroid, Vibration, View } from 'react-native';

import { CircularButton, RectButton } from './Buttons';
import Category from './Category';
import DoNotRepeat from './DoNotRepeat';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'

import { getData, storeData } from '../utils/asyncStorage';

import { strings, asserts, categories, FONTS, todoKey, ROUTES, COLORS } from '../constants';

import { styles } from './Form.styles';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import * as Notifications from 'expo-notifications';

const defaultToDo = {
  id: '',
  title: '',
  subTitle: '',
  time: '',
  label_category: strings.home,
  label_color: COLORS.home,
  do_not_repeat: true,
  isCompleted: false
};

const Form = ({ route, navigation, ...props }) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [todo, setTodo] = useState(defaultToDo);
  const [date, setDate] = useState('');

  const focusTitle = useRef(new Animated.Value(0)).current;
  const focusDesc = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let currentTime = new Date();
    let initialTime = moment(currentTime).format('MMM D YYYY - hh:mm a');
    setTodo({ ...todo, time: initialTime });
  }, [])

  useEffect(() => {
    if (!todo.time) return;
    let time = todo.time.split(' ');
    let modified = `${time[1]}-${time[0]}-${time[2]} ${time[4]} ${time[5]}`;
    setDate(modified);

  }, [todo])

  useEffect(() => {
    if (route.params) {
      setTodo({ ...todo, ...route.params.item })
      Animated.parallel([
        Animated.timing(focusTitle, { toValue: 1, useNativeDriver: false }),
        Animated.timing(focusDesc, { toValue: 1, useNativeDriver: false })
      ]).start()
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

      let toDo = todo;
      toDo.id = identifier;

      await storeData(todoKey, [...jsonValue, toDo])
      setTodo(defaultToDo);
      navigation.navigate(ROUTES.home_screen, { data: [...jsonValue, toDo] });

    } else {
      await Notifications.cancelScheduledNotificationAsync(todo.id);

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: todo.title,
          body: todo.subTitle,
          data: { data: todo.label_category },
        },
        trigger
      })

      let find = jsonValue.find(e => e.id === todo.id)
      let idx = jsonValue.indexOf(find)

      jsonValue[idx] = todo;
      jsonValue[idx]["id"] = identifier;

      await storeData(todoKey, jsonValue)
      setTodo(defaultToDo);
      navigation.navigate(ROUTES.home_screen, { data: jsonValue });
    }

    Vibration.vibrate();

    ToastAndroid.show(
      "Task added successfully",
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
    setTodo({ ...todo, time })
    hideDatePicker();
  };

  const focusedTitle = {
    top: focusTitle.interpolate({
      inputRange: [0, 1],
      outputRange: ['47%', '0%']
    }),
    color: focusTitle.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.sub_title, COLORS.black]
    }),
  }

  const focusedDesc = {
    top: focusDesc.interpolate({
      inputRange: [0, 1],
      outputRange: ['47%', '0%']
    }),
    color: focusDesc.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.sub_title, COLORS.black]
    }),
  }
  return (

    <View style={{ ...styles.form, ...props }} >
      <Text style={styles.createNewTask}>{strings.add_task}</Text>

      <View style={styles.titleInputContainer}>
        <Animated.Text
          style={[
            styles.title,
            focusedTitle
          ]}>Title</Animated.Text>
        <TextInput
          // onFocus={onFocusTitle}
          onFocus={() => Animated.timing(focusTitle, { toValue: 1, useNativeDriver: false }).start()}
          onBlur={() => !todo.title && Animated.timing(focusTitle, { toValue: 0, useNativeDriver: false }).start()}
          style={styles.titleInput}
          onChangeText={(text) => handlChange('title', text)}
          defaultValue={todo.title}
        />
      </View>

      <Text style={styles.categoryTitle}>{strings.category}</Text>
      <View style={styles.categoryListContainer}>
        {
          categories.map((category, idx) =>
            <Category key={idx} handlePress={onSelectCategory} category={category}
              idx={idx} value={todo.label_category}
            />)
        }
      </View>
      <Text style={styles.taskDetails}>{strings.task_details}</Text>

      <Pressable onPress={showDatePicker}>
        <View style={styles.dateTimeContainer}>
          <Image
            source={asserts.clock}
            style={styles.clockLogo}
            resizeMode='contain'
          />
          <TextInput
            style={styles.dateTime}
            defaultValue={todo.time}
            onChangeText={(text) => handlChange('time', text)}
          />
        </View>
      </Pressable>

      <View style={styles.descriptionInputContainer}>
        <Image
          source={asserts.description}
          style={styles.clockLogo}
          resizeMode='contain'
        />
        <View style={styles.descriptionInputSubContainer}>
          <Animated.Text style={[styles.title, focusedDesc]}>{strings.add_description}</Animated.Text>
          <TextInput
            multiline
            // onFocus={onFocusDesc}
            onFocus={() => Animated.timing(focusDesc, { toValue: 1, useNativeDriver: false }).start()}
            onBlur={() => !todo.subTitle && Animated.timing(focusDesc, { toValue: 0, useNativeDriver: false }).start()}
            style={styles.description}
            defaultValue={todo.subTitle}
            onChangeText={(text) => handlChange('subTitle', text)}
          />
        </View>
      </View>
      {/*<DoNotRepeat handleToggle={handleToggle} switchBool={todo.do_not_repeat} />*/}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <RectButton
        position={'absolute'}
        title={strings.create_task}
        bottom={'8%'}
        // height={'8%'}
        width={'100%'}
        backgroundColor={COLORS.main}
        color={COLORS.white}
        alignSelf={'center'}
        borderRadius={12}
        handlePress={pressHandle}
      />

    </View >
  );
};

export default Form;
