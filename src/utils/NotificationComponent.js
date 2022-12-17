import PushNotification from 'react-native-push-notification';
import {channel} from '../constants';

export const handleNotification = (item, trigger, isNew) => {
  const {subTitle, id, time, label_category, title, label_color} = item;

  if (isNew) {
    console.log('new');
    // PushNotification.localNotificationSchedule({
    //   id,
    //   date: new Date(trigger),
    //   channelId: 'test-channel',
    //   title: label_category,
    //   message: title,
    //   subText: ' at ' + time.split(' ').slice(4).join(' ').toLocaleLowerCase(),
    //   bigText: subTitle,
    //   vibrate: true,
    //   vibration: 300,
    //   color: label_color,
    //   actions: ['Done', 'Snooze'],
    //   allowWhileIdle: true,
    // });
  } else {
    PushNotification.localNotificationSchedule({
      message: 'My Notification Message', // (required)
      date: new Date(Date.now() + 60 * 1000), // in 60 secs
      actions: ['ReplyInput'],
      reply_placeholder_text: 'Write your response...', // (required)
      reply_button_text: 'Reply', // (required)
    });
    // const d = new Date(trigger);

    // PushNotification.cancelLocalNotification(`${id}`);
    // console.log('old', id);
    // const idx = PushNotification.localNotification({
    //   // id: `${id}`,
    //   // date: new Date(Date.now() + 5),
    //   channelId: channel.local.id,
    //   title: label_category,
    //   message: title,
    //   subText: ' at ' + time,
    //   bigText: subTitle,
    //   vibrate: true,
    //   vibration: 300,
    //   color: label_color,
    //   actions: ['Done', 'Snooze'],
    //   allowWhileIdle: true,
    // });
    // console.log('old', idx);
  }
};
