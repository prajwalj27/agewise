import { View, Text, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import SettingsIcon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { useState, useEffect } from 'react';

import { COLORS, FONT } from '../../constants/theme';

const ScreenHeader = ({ title }) => {
  const [date, setDate] = useState(new Date());

  const refreshClock = () => {
    setDate(new Date());
  };
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
            // <TouchableOpacity style={{ paddingRight: 10 }}>
            //   <SettingsIcon color="white" name="settings" size={25} />
            // </TouchableOpacity>
            <Text
              style={{
                color: COLORS.darkHeading,
                fontFamily: FONT.bold,
                fontSize: 28,
              }}
            >
              {date.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </Text>
          ),
        }}
      />
    </>
  );
};

export default ScreenHeader;
