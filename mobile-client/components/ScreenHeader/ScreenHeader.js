import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, FONT } from '../../constants/theme';

const ScreenHeader = ({ title }) => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key');
        const userData = JSON.parse(jsonValue);
        setUser(userData.username);
        console.log(userData)
        return userData;
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  const refreshClock = () => {
    setDate(new Date());
  };
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Logged Out');
      router.push('/login');
    } catch (e) {
      // saving error
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.darkBackground },
          headerShadowVisible: true,
          headerTitle: '',
          headerLeft: () => (
            <Text
              style={{
                color: COLORS.darkHeading,
                fontFamily: FONT.bold,
                fontSize: 30,
              }}
            >
              {title}
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={logout}>
              <Text
                style={{
                  color: COLORS.primaryColor,
                  fontFamily: FONT.bold,
                  fontSize: 30,
                }}
              >
                {user}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </>
  );
};

export default ScreenHeader;
