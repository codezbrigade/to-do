import React, {useState} from 'react';
import {
  // Dimensions,
  Image,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

import {asserts, COLORS, FONTS, ROUTES, strings, todoKey} from '../constants';

import Label from './Label';
import {CircularButton, RectButton} from './Buttons';
import DoNotRepeat from './DoNotRepeat';
import Confirmation from './Confirmation';

import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import PushNotification from 'react-native-push-notification';

const PreviewSheet = props => {
  const {
    payload: {item, setToDoList},
  } = props;

  const [isvisible, setIsVisible] = useState(false);

  const [todo, setTodo] = useState(item);
  const {getItem, setItem} = useAsyncStorage(todoKey);

  const navigation = useNavigation();

  const handleToggle = bool => setTodo({...todo, do_not_repeat: bool});

  const deleteItem = () => {
    setIsVisible(true);
  };

  const confirmDeleteItem = async () => {
    //delete todo
    let data = await getItem();
    let jsonValue = JSON.parse(data);

    setIsVisible(false);

    PushNotification.cancelLocalNotification(todo.id);

    let filteredList = jsonValue.filter(obj => obj.id !== todo.id);

    await setItem(JSON.stringify(filteredList));

    ToastAndroid.show(
      'Task deleted successfully',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToDoList(filteredList);

    SheetManager.hide('preview', {payload: false});
  };

  const navigate = () => {
    SheetManager.hide('preview', {payload: false});
    navigation.navigate(ROUTES.new_task_screen, {item: todo});
  };

  return (
    todo && (
      <ActionSheet id={props.sheetId} containerStyle={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.previewContainer}>
            <View style={styles.innerContainer}>
              <Label
                label={{
                  label_category: todo.label_category,
                  label_color: todo.label_color,
                }}
              />
              <View style={styles.title_time}>
                <Text style={styles.title}>{todo.title}</Text>
                <View style={styles.dateTimeContainer}>
                  <Text style={styles.date}>{todo.time}</Text>
                  <Image
                    source={asserts.calenderLogo}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View>
                <Text style={styles.description}>{strings.description}</Text>
                <Text style={styles.details}>{todo.subTitle}</Text>
              </View>
              <View style={styles.btnGroup}>
                <RectButton
                  color={'white'}
                  title={strings.edit}
                  backgroundColor={COLORS.main}
                  handlePress={navigate}
                />
                <RectButton
                  color={'white'}
                  title={strings.delete}
                  backgroundColor={COLORS.delete}
                  handlePress={deleteItem}
                />
              </View>
              <CircularButton
                imageUrl={asserts.closeBtn}
                imgSize={26}
                position={'absolute'}
                right={0}
                handlePress={() =>
                  SheetManager.hide('preview', {payload: false})
                }
              />
            </View>
            <DoNotRepeat
              handleToggle={handleToggle}
              switchBool={todo.do_not_repeat}
            />
          </View>
        </ScrollView>
        <Confirmation
          confirmDeleteItem={confirmDeleteItem}
          isvisible={isvisible}
          setIsVisible={setIsVisible}
        />
      </ActionSheet>
    )
  );
};

export default PreviewSheet;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  image: {
    height: 20,
    width: 20,
    marginTop: '5%',
    marginLeft: '3%',
  },
  previewContainer: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: hp(2), //16,
    alignItems: 'center',
  },
  innerContainer: {
    width: '85%',
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
    lineHeight: 38.4,
  },
  dateTimeContainer: {
    flexDirection: 'row',
  },
  date: {
    fontSize: RFValue(14),
    lineHeight: hp(2.42),
    fontFamily: FONTS.RobotoRegular_400,
    paddingVertical: '5%',
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
    color: COLORS.inActiveHeader,
  },
  btnGroup: {
    marginTop: 26,
    marginBottom: 66,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});
