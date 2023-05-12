import { Tabs, Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';
import MoodIcon from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

import { COLORS, FONT } from '../../constants/theme';

export default function AppLayout() {
  return (
    <>
      <StatusBar animated={true} barStyle={'light-content'} />
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: COLORS.darkBackground,
            height: 100,
            borderTopColor: 'none',
          },
          tabBarLabelStyle: {
            fontSize: 18,
            marginBottom: 7,
            fontFamily: FONT.medium,
          },
          tabBarItemStyle: { width: 100 },
          tabBarActiveTintColor: COLORS.primaryColor,
        }}
      >
        <Tabs.Screen
          name="stories"
          options={{
            title: 'Stories',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="auto-stories" size={50} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="reminders"
          options={{
            title: 'Reminders',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="reminder" size={50} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="chat" size={50} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
