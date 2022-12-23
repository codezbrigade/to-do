import PushNotification, {Importance} from 'react-native-push-notification';
import {channel} from '../constants';

export const createChanel = () => {
  PushNotification.createChannel({
    channelId: channel.local.id,
    channelName: channel.local.name,
    vibrate: true,
    importance: Importance.HIGH,
  });
  PushNotification.createChannel({
    channelId: channel.remote.id,
    channelName: channel.remote.name,
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
    allowWhileIdle: true,
    invokeApp: false,
  });
};

export const snoozeActionHandler = (
  id,
  channelId,
  title,
  bigText,
  message,
  color,
) =>
  PushNotification.localNotificationSchedule({
    id,
    channelId,
    title,
    bigText,
    message,
    color,
    actions: ['Done', 'Snooze'],
    date: new Date(Date.now() + 60 * 1000),
    // largeIconUrl: 'https://img.freepik.com/free-icon/todo-list_318-10185.jpg',
    allowWhileIdle: true,
    invokeApp: false,
  });

export const localNotification = (title, message, largeIconUrl, id) => {
  PushNotification.localNotification({
    id,
    channelId: channel.remote.id,
    title,
    message,
    largeIconUrl,
    bigPictureUrl: largeIconUrl,
    allowWhileIdle: true,
    invokeApp: false,
  });
};
