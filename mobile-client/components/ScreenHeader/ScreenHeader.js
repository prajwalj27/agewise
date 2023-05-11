import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, FONT } from '../../constants/theme';
import { getLoggedInUser } from '../../utils/userLogin';

const ScreenHeader = ({ title }) => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState('');

  const refreshClock = () => {
    setDate(new Date());
  };
  
  useEffect(() => {
    getLoggedInUser(setUser);
  }, []);


  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  

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
            <TouchableOpacity onPress={() => router.push('/profile')}>
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
