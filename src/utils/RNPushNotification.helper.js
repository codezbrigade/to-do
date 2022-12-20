import PushNotification, {Importance} from 'react-native-push-notification';
import {channel} from '../constants';

export const createLocalChanel = () => {
  PushNotification.createChannel({
    channelId: channel.local.id,
    channelName: channel.local.name,
    vibrate: true,
    importance: Importance.HIGH,
  });
};

export const handleNotification = (item, trigger, isNew) => {
  let date = trigger.split(' ');
  let grpOne = date[0].split('-').reverse();
  let grpTwo = date[1].split(':');
  let sign = date[2];
  let hour = parseInt(grpTwo[0], 10);
  grpTwo[0] =
    sign === 'am' ? (hour < 12 ? hour : '00') : hour < 12 ? hour + 12 : hour;

  const modifiedDate = [...grpOne, ...grpTwo, 0, 0];
  const fireDate = new Date(...modifiedDate);

  notificationScheduler(item, fireDate, isNew);
};

const notificationScheduler = (item, fireDate, isNew) => {
  const {subTitle, id, time, label_category, title, label_color} = item;

  if (!isNew) PushNotification.cancelLocalNotification(id);
  PushNotification.localNotificationSchedule({
    id,
    channelId: channel.local.id,
    title: `${label_category} at ${time.split(' ').slice(4).join(' ')}`,
    bigText: title,
    message: subTitle, // (required)
    color: label_color,
    actions: ['Done', 'Snooze'],
    date: fireDate,
    // largeIcon:
    //   'https://static.vecteezy.com/system/resources/thumbnails/002/098/204/small/silver-tabby-cat-sitting-on-green-background-free-photo.jpg', // (optional) default: undefined
    smallIcon: 'ic_launcher',
    allowWhileIdle: true,
  });
};

export const details = {
  ticker: 'My Notification Ticker', // (optional)
  showWhen: true, // (optional) default: true
  autoCancel: true, // (optional) default: true
  largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
  largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
  smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
  // bigText:
  //   'My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)', // (optional) default: "message" prop
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
