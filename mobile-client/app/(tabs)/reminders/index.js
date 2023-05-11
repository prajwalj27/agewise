import {
  View,
  Text,
  Button,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import * as Device from 'expo-device';

import styles from './style';
import { ScreenHeader, Clock } from '../../../components';
import { COLORS, FONT, SIZES } from '../../../constants/theme';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Reminders = () => {
  const datetime = new Date().toISOString();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Reminders" />

      <Clock />

      {/* <Text
        style={{
          color: COLORS.darkHeading,
          fontFamily: FONT.bold,
          fontSize: SIZES.regular,
          marginBottom: 10,
        }}
      >
        Here are your Reminders
      </Text> 

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>
            Title: {notification && notification.request.content.title}{' '}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:{' '}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              Go for a walk
            </Text>
            <Text style={styles.textAlt}>10:00 am &#8226; Mon, 1 May</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <EditIcon name="edit" color={COLORS.primaryColor} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <DeleteIcon name="delete-outline" color="red" size={30} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              Meet Mr. Sharmaji
            </Text>
            <Text style={styles.textAlt}>11:35 am &#8226; Mon, 8 May</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <EditIcon name="edit" color={COLORS.primaryColor} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <DeleteIcon name="delete-outline" color="red" size={30} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              Take Medicines
            </Text>
            <Text style={styles.text}>09:30 pm &#8226; Sun, 14 May</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <EditIcon name="edit" color={COLORS.primaryColor} size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <DeleteIcon name="delete-outline" color="red" size={30} />
            </TouchableOpacity>
          </View>
        </View>

        
      </ScrollView>
    </View>
  );
};

export default Reminders;

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 10 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    try {
      const response = await Notifications.getExpoPushTokenAsync();
      token = response.data;
      // console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
