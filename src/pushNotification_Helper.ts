import notifee  from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import * as Controllers from './Services/Controllers';
import { Object_ } from './Services/Objects';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Notification {
  title: string,
  body: string,
};

export async function RequestUserPermission(response: Object_.SignIn) {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("new token: " + fcmToken)
      await Controllers.Logon.AtualizacaoDoTokenDeNotificacao(response.token, response.pessoa!.id, fcmToken);
    }
  }
}

async function StoringData(notification: any) {

  let getNotification: Notification[] = [];

  AsyncStorage.getItem("@One+_Notification").then(res => {
    if(res) {
      getNotification = JSON.parse(res) || "[]";
      console.log('res', JSON.parse(res || "[]"));
    }
  }).catch(err => console.log(err));
  console.log(getNotification)

  let objectNotification: Notification = {
    title: notification?.title,
    body: notification?.body,
  };

  getNotification!?.push(objectNotification)

  AsyncStorage.setItem("@One+_Notification", JSON.stringify(getNotification));
};

export const NotificationListner = async () => {
  const channelId = await notifee.createChannel({
    id: 'com.newoneplus',
    name: 'com.newoneplus',
  });
  messaging().onNotificationOpenedApp(remoteMessage => remoteMessage.notification);
  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      remoteMessage.notification;
      StoringData(remoteMessage.notification);
    }
  });
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(remoteMessage.notification)
    await remoteMessage.notification;
    StoringData(remoteMessage.notification);
    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      android: {channelId}
    });
  });
  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage.notification)
    StoringData(remoteMessage.notification);
    await notifee.requestPermission()
    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      android: {channelId}
    });
  })
}