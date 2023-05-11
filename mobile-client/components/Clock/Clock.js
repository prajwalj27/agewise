import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, FONT, SIZES } from '../../constants/theme';

const Clock = () => {
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
    <View>
      <Text
        style={{
          margin: 20,
          fontFamily: FONT.regular,
          fontSize: 50,
          color: COLORS.darkHeading,
          textAlign: 'center',
        }}
      >
        {date.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </Text>
    </View>
  );
};

export default Clock;
