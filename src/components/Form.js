import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  Vibration,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
/**
 * Note: In 2.4.0, the globally exported moment object was deprecated.
 * It will be removed in next major release.
 */

import {RectButton} from './Buttons';
import Category from './Category';

import {getData, storeData} from '../utils/asyncStorage';
import {
  strings,
  asserts,
  categories,
  todoKey,
  ROUTES,
  COLORS,
  MONTHS,
} from '../constants';
import {handleNotification} from '../utils/RNPushNotification.helper';

import {styles} from './Form.styles';

const INITIAL_STATE = {
  id: '',
  title: '',
  subTitle: '',
  time: '',
  label_category: strings.home,
  label_color: COLORS.home,
  do_not_repeat: true,
  isCompleted: false,
};

const focus = element => {
  return {
    top: element.interpolate({
      inputRange: [0, 1],
      outputRange: ['54%', '0%'],
    }),
    color: element.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.sub_title, COLORS.black],
    }),
  };
};

const Form = ({route, navigation, ...props}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [todo, setTodo] = useState(INITIAL_STATE);
  const [date, setDate] = useState('');

  const focusTitle = useRef(new Animated.Value(0)).current;
  const focusDesc = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let currentTime = new Date();
    let initialTime = moment(currentTime).format('MMM D YYYY - hh:mm a');
    setTodo({...todo, time: initialTime});
  }, []);

  useEffect(() => {
    if (!todo.time) return;
    let time = todo.time.split(' ');

    let modified = `${time[1]}-${MONTHS.indexOf(time[0])}-${time[2]} ${
      time[4]
    } ${time[5]}`;
    setDate(modified);
  }, [todo]);

  useEffect(() => {
    if (route.params) {
      setTodo({...todo, ...route.params.item});
      Animated.parallel([
        Animated.timing(focusTitle, {toValue: 1, useNativeDriver: false}),
        Animated.timing(focusDesc, {toValue: 1, useNativeDriver: false}),
      ]).start();
    }
  }, [route]);

  const handlChange = (name, value) => {
    setTodo(todo => {
      return {
        ...todo,
        [name]: value,
      };
    });
  };

  // const handleToggle = (bool) => setTodo({ ...todo, do_not_repeat: bool });

  const onSelectCategory = category => {
    let {name: label_category, color: label_color} = category;
    setTodo({...todo, label_category, label_color});
  };

  const pressHandle = async () => {
    if (!todo.title || !todo.time) return;

    let jsonValue = (await getData(todoKey)) || [];

    if (!todo.id) {
      let toDo = todo;
      toDo.id = Math.ceil(Math.random() * 1000000000);

      handleNotification(toDo, date, true);

      await storeData(todoKey, [...jsonValue, toDo]);
      setTodo(INITIAL_STATE);
      navigation.navigate(ROUTES.home_screen, {data: [...jsonValue, toDo]});
    } else {
      handleNotification(todo, date, false);

      let find = jsonValue.find(e => e.id === todo.id);
      let idx = jsonValue.indexOf(find);
      jsonValue[idx] = todo;

      await storeData(todoKey, jsonValue);
      setTodo(INITIAL_STATE);
      navigation.navigate(ROUTES.home_screen, {data: jsonValue});
    }

    Vibration.vibrate();

    ToastAndroid.show(
      'Task added successfully',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = dateTime => {
    const time = moment(dateTime).format('MMM D YYYY - hh:mm a');
    setTodo({...todo, time});
    setDate(dateTime);
    hideDatePicker();
  };

  const onFocusTitle = focus(focusTitle);
  const onFocusDesc = focus(focusDesc);

  const onFocusHandler = element =>
    Animated.timing(element, {
      toValue: 1,
      useNativeDriver: false,
    }).start();

  const onBulurHandler = element => {
    Animated.timing(element, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{...styles.form, ...props}}>
      <Text style={styles.createNewTask}>{strings.add_task}</Text>

      <View style={styles.titleInputContainer}>
        <Animated.Text style={[styles.title, onFocusTitle]}>
          Title
        </Animated.Text>
        <TextInput
          onFocus={() => onFocusHandler(focusTitle)}
          onBlur={() => !todo.title && onBulurHandler(focusTitle)}
          style={styles.titleInput}
          onChangeText={text => handlChange('title', text)}
          defaultValue={todo.title}
        />
      </View>

      <Text style={styles.categoryTitle}>{strings.category}</Text>
      <View style={styles.categoryListContainer}>
        {categories.map((category, idx) => (
          <Category
            key={idx}
            handlePress={onSelectCategory}
            category={category}
            idx={idx}
            value={todo.label_category}
          />
        ))}
      </View>
      <Text style={styles.taskDetails}>{strings.task_details}</Text>

      <Pressable onPress={showDatePicker}>
        <View style={styles.dateTimeContainer}>
          <Image
            source={asserts.clock}
            style={styles.clockLogo}
            resizeMode="contain"
          />
          <TextInput
            style={styles.dateTime}
            defaultValue={todo.time}
            onChangeText={text => handlChange('time', text)}
          />
        </View>
      </Pressable>

      <View style={styles.descriptionInputContainer}>
        <Image
          source={asserts.description}
          style={styles.clockLogo}
          resizeMode="contain"
        />
        <View style={styles.descriptionInputSubContainer}>
          <Animated.Text style={[styles.title, onFocusDesc]}>
            {strings.add_description}
          </Animated.Text>
          <TextInput
            multiline
            onFocus={() => onFocusHandler(focusDesc)}
            onBlur={() => !todo.title && onBulurHandler(focusDesc)}
            style={styles.description}
            defaultValue={todo.subTitle}
            onChangeText={text => handlChange('subTitle', text)}
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
        width={'100%'}
        backgroundColor={COLORS.main}
        color={COLORS.white}
        alignSelf={'center'}
        borderRadius={12}
        handlePress={pressHandle}
      />
    </View>
  );
};

export default Form;
