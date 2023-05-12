import {
  View,
  Text,
  Button,
  ScrollView,
  Platform,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect, useRef, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import DeleteIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditIcon from 'react-native-vector-icons/MaterialIcons';
import * as Device from 'expo-device';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import axios from 'axios';

import styles from './style';
import { ScreenHeader, Clock } from '../../../components';
import { COLORS, FONT, SIZES } from '../../../constants/theme';
import { baseURL } from '../../../config';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Reminders = () => {
  const datetime = new Date().toISOString();
  const router = useRouter();

  const [reminders, setReminders] = useState();
  const [refreshing, setRefreshing] = useState(false)

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getReminders()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getReminders = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/reminders`);
      setReminders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReminders();
  }, []);

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
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        progressBackgroundColor={COLORS.primaryColor}
      />
    }>
      <ScreenHeader title="Reminders" />

      <Clock />

      {/* <View>
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate;
            setDate(currentDate);
          }}
        />
      </View> */}

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

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primaryColor,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            height: 45,
            width: 90,
          }}
          onPress={() => {
            router.push('/newReminder');
          }}
        >
          <Text
            style={{
              fontFamily: FONT.bold,
              color: COLORS.darkHeading,
              fontSize: 20,
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>

      <View
        showsVerticalScrollIndicator={false}
        
      >
        {reminders?.map((reminder) => (
          <View style={styles.card} key={reminder.id}>
            <View>
              <Text style={styles.title} numberOfLines={1}>
                {reminder.title}
              </Text>
              <Text style={styles.text}>{reminder.datetime}</Text>
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
        ))}
      </View>
    </ScrollView>
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
