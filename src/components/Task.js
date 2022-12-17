import React, {useLayoutEffect, useRef} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {
  Animated,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {FONTS, COLORS, todoKey, asserts} from '../constants';

import {CircularButton} from './Buttons';
import Label from './Label';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import DateTime from './DateTime';

import {SheetManager} from 'react-native-actions-sheet';

const Task = ({item, setToDoList}) => {
  const {title, time, isCompleted, label_category, label_color} = item;

  const newTitle = title.length > 18 ? title.slice(0, 17) + '...' : title;

  const {getItem, setItem} = useAsyncStorage(todoKey);

  const opacity = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: false,
    }).start();

    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeIsCompleted = async () => {
    // setTimeUp(false);

    let data = await getItem();
    let jsonValue = JSON.parse(data);

    let find = jsonValue.find(obj => obj.id === item.id);
    let idx = jsonValue.indexOf(find);
    // console.log(find)
    jsonValue[idx].isCompleted = !isCompleted;

    await setItem(JSON.stringify(jsonValue));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToDoList(jsonValue);
  };

  const preview = () => {
    // console.log(item);
    SheetManager.show('preview', {payload: {item, setToDoList}});
  };

  return (
    <Animated.View style={[styles.taskContainer, {opacity}]}>
      <TouchableOpacity onPress={preview} style={styles.details}>
        <Label label={{label_category, label_color}} />

        <View style={styles.sub}>
          <Text
            style={{
              ...styles.title,
              textDecorationLine: isCompleted ? 'line-through' : '',
            }}>
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
    </Animated.View>
  );
};

export default Task;

const styles = StyleSheet.create({
  taskContainer: {
    height: hp(8.64),
    width: '100%',
    marginVertical: hp(1), //1.32
    // elevation: 4,
    borderRadius: 16,
    overflow: 'hidden',
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
    justifyContent: 'space-between',
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
    color: COLORS.sub_title,
  },
  isCompleted: {
    paddingHorizontal: wp(4.73),
    width: '10%',
  },
});

const details = {
  ticker: 'My Notification Ticker', // (optional)
  showWhen: true, // (optional) default: true
  autoCancel: true, // (optional) default: true
  largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
  largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
  smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
  bigText:
    'My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)', // (optional) default: "message" prop
  subText: 'This is a subText', // (optional) default: none
  bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
  bigLargeIcon: 'ic_launcher', // (optional) default: undefined
  bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg', // (optional) default: undefined
  color: 'red', // (optional) default: system default
  vibrate: true, // (optional) default: true
  vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
  tag: 'some_tag', // (optional) add tag to message
  group: 'group', // (optional) add group to message
  groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
  ongoing: false, // (optional) set whether this is an "ongoing" notification
  priority: 'high', // (optional) set notification priority, default: high
  visibility: 'private', // (optional) set notification visibility, default: private
  ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
  shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
  onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

  when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
  usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
  timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

  messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

  actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
  invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
};
