import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';
import { COLORS, FONT, SIZES } from '../../constants/theme';
import { ScreenHeader } from '../../components';
import axios from 'axios';
// import { users, seniorCitizenNames } from '../../constants/dummy';
import { getLoggedInUser } from '../../utils/userLogin';
import { baseURL } from '../../config';

const NewReminder = () => {
  const router = useRouter();

  const [user, setUser] = useState();
  const [title, setTitle] = useState();

  const [allStories, setAllStories] = useState();

  const [allReminders, setAllReminders] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const createReminder = async () => {
    const newReminder = {
      id: allReminders?.length,
      datetime: `${date}, ${time}`,
      title: title,
    };

    try {
      const { data } = await axios.post(`${baseURL}/api/reminders/new`, newReminder);
      console.log(data);
    } catch (e) {
      console.log(e);
    }

    router.push('/reminders');
  };

  useEffect(() => {
    const getAllReminders = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/reminders`);
        setAllReminders(data);
      } catch (e) {
        console.log(e);
      }
    };

    getAllReminders();
  }, []);

  useEffect(() => {
    getLoggedInUser(setUser);
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Create" />
      <StatusBar animated={true} barStyle={'light-content'} />

      <View style={styles.loginInputs}>
        <Text
          style={{
            color: 'white',
            fontFamily: FONT.bold,
            fontSize: SIZES.large,
            textAlign: 'center',
            marginBottom: 33,
          }}
        >
          Add a <Text style={{ color: COLORS.primaryColor }}>Reminder</Text>!
        </Text>

        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Remind me to..."
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <Text style={styles.text}>Date</Text>
        <TextInput
          style={styles.textInput}
          placeholder="dd/mm/yyyy"
          value={date}
          onChangeText={(text) => setDate(text)}
        />

        <Text style={styles.text}>Time</Text>
        <TextInput
          style={styles.textInput}
          placeholder="hh:ss (24-hr format)"
          value={time}
          onChangeText={(text) => setTime(text)}
        />

        <TouchableOpacity style={styles.button}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
              paddingTop: 8,
              color: 'white',
            }}
            onPress={() => {
              createReminder();
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewReminder;
