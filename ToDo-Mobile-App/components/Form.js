import React, { useEffect, useState } from 'react';

import { Image, Pressable, Text, TextInput, View } from 'react-native';

import { RectButton } from './Buttons';
import Category from './Category';
import DoNotRepeat from './DoNotRepeat';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'

import { useNavigation } from '@react-navigation/native';
import { getData, storeData } from '../utils/asyncStorage';

import { strings, asserts, categories, FONTS, todoKey, ROUTES } from '../constants';
import { createAlert } from '../utils/Alert';

import { styles } from './Form.styles';

const defaultToDo = {
  id: '',
  title: '',
  subTitle: '',
  time: '',
  label_category: '',
  label_color: '',
  do_not_repeat: false,
  isCompleted: false
};

const Form = ({ route, ...props }) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [todo, setTodo] = useState(defaultToDo);

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params) {
      setTodo({ ...todo, ...route.params.item })
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

    if (!todo.id) {

      let toDo = todo;
      toDo.id = parseInt(Math.random() * 1000000000).toString();

      await storeData(todoKey, [...jsonValue, toDo])
      setTodo(defaultToDo);
      navigation.navigate(ROUTES.home_screen, [...jsonValue, toDo]);

    } else {

      let find = jsonValue.find(e => e.id === todo.id)
      let idx = jsonValue.indexOf(find)

      jsonValue[idx] = todo;

      await storeData(todoKey, jsonValue)
      setTodo(defaultToDo);
      navigation.navigate(ROUTES.home_screen, jsonValue);
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateTime) => {
    const time = moment(dateTime).format('MMM D YYYY hh:mm A');
    setTodo({ ...todo, time })
    hideDatePicker();
  };

  return (
    <View style={{ ...styles.form, ...props }}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={strings.add_title}
          onChangeText={(text) => handlChange('title', text)}
          defaultValue={todo.title}
        />

        <Pressable style={{
          ...styles.textInput2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }} onPress={showDatePicker}>
          <TextInput
            style={{
              fontSize: 16,
              fontFamily: FONTS.InterRegular,
              width: '80%'
            }}
            placeholder={strings.dateTime}
            defaultValue={todo.time}
            onChangeText={(text) => handlChange('time', text)}
          />
          <Image
            source={asserts.calenderLogo}
            style={{ height: 20, width: 20 }}
            resizeMode='contain'
          />
        </Pressable>

        <TextInput
          style={styles.textInput2}
          placeholder={strings.description}
          defaultValue={todo.sub_title}
          onChangeText={(text) => handlChange('subTitle', text)}
        />
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

      <RectButton bottom={20} handlePress={pressHandle} />
    </View>
  );
};

export default Form;