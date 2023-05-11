import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { usePathname, Stack, useRouter } from 'expo-router';
import SendIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../style';
import { COLORS, FONT } from '../../../constants/theme';
import { discussions, chat } from '../../../constants/dummy';

const Chat = () => {
  const pathName = usePathname();
  const router = useRouter();
  const chatId = pathName.split('/')[2];
  const [user, setUser] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key');
        const userData = JSON.parse(jsonValue);
        setUser(userData.username);
        return userData;
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.darkBackground },
          headerShadowVisible: true,
          headerTitle: discussions[chatId].topic,
          headerTintColor: COLORS.primaryColor,
        }}
      />
      <StatusBar animated={true} barStyle={'light-content'} />

      <ScrollView style={styles.container}>
        {chat.map((msg) => (
          <View
            style={
              user === msg.author
                ? { flexDirection: 'row-reverse' }
                : { flexDirection: 'row' }
            }
            key={msg.id}
          >
            <View style={user === msg.author ? styles.myMessage : styles.message}>
              
              <View
                style={styles.msgHeader}
              >
                <Text
                  style={styles.msgAuthor}
                  numberOfLines={1}
                >
                  {msg.author}
                </Text>
                <Text
                  style={styles.msgDate}
                >
                  {msg.datetime.split(' ')[0]}
                </Text>
              </View>

              <Text style={styles.msgText}>{msg.message}</Text>
              <Text
                style={{
                  color: COLORS.darkText,
                  fontFamily: FONT.regular,
                  fontSize: 14,
                  textAlign: user === msg.author ? 'left' : 'right',
                }}
              >
                {msg.datetime.split(' ')[1]}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: 'black',
          borderWidth: 0.5,
          backgroundColor: COLORS.darkBackground,
        }}
      >
        <TextInput
          placeholder="Type something..."
          placeholderTextColor={COLORS.darkText}
          value={text}
          onChangeText={(msg) => setText(msg)}
          style={{
            padding: 5,
            width: '90%',
            color: COLORS.darkHeading,
            fontFamily: FONT.regular,
            backgroundColor: COLORS.darkGrey,
            height: 45,
            borderRadius: 8,
          }}
        />
        <TouchableOpacity onPress={() => {}}>
          <SendIcon name="send" color={COLORS.primaryColor} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
