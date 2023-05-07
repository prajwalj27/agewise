import { View, Text, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import SettingsIcon from 'react-native-vector-icons/Feather';
import moment from "moment";
import { useState, useEffect } from 'react';

import { COLORS, FONT } from '../../constants/theme';

const ScreenHeader = ({ title }) => {
  // var now = new moment();
  // console.log(now.format('HH:mm:ss'));

  const [currentDate, setCurrentDate] = useState('');

useEffect(() => {   
        
    // get current time 

     var date = moment().utcOffset('+05:30').format(' hh:mm:ss a');

    // or get time ' hh:mm:ss a'

    setCurrentDate(date); 
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
                fontSize: 28,
              }}
            >
              {title}
            </Text>
          ),
          headerRight: () => (
            <TouchableOpacity style={{ paddingRight: 10 }}>
              <SettingsIcon color="white" name="settings" size={25} />
            </TouchableOpacity>
            // <Text>Current Date:{currentDate}</Text>
          ),
        }}
      />
    </>
  );
};

export default ScreenHeader;
