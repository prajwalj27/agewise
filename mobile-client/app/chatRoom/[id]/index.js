import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname, Stack, useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

import styles from '../style';
import { COLORS, FONT } from '../../../constants/theme';
import { discussions, chat } from '../../../constants/dummy';
import { getLoggedInUser } from '../../../utils/userLogin';
import { baseURL } from '../../../config';

const Chat = () => {
  const pathName = usePathname();
  const scrollViewRef = useRef();
  const router = useRouter();

  const chatId = pathName.split('/')[2];

  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState('');
  const [text, setText] = useState('');
  const [allChats, setAllChats] = useState();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllChats();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  
  const getAllChats = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/chats/${chatId}`);
      setAllChats(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (function () {
      // do some stuff
      onRefresh();

      setTimeout(arguments.callee, 5000);
    })();
  }, []);

  useEffect(() => {
    getLoggedInUser(setUser);
  }, []);

  useEffect(() => {
    getAllChats();
  }, []);

  const sendMessage = async () => {
    if (text !== '') {
      const newMessage = {
        id: allChats?.length,
        author: user,
        message: text,
        datetime: new Date().toLocaleString().slice(0, 17),
      };

      try {
        const { data } = await axios.post(
          `${baseURL}/api/chats/new/${chatId}`,
          newMessage
        );
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    }

    setText('');
    onRefresh();
    // onRefresh();
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.darkBackground },
          headerShadowVisible: true,
          headerTitle: discussions[chatId].topic,
          headerTintColor: COLORS.primaryColor,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                onRefresh();
                this.scrollView.scrollToEnd({ animated: true });
              }}
            >
              <MaterialIcons
                name="refresh"
                color={COLORS.primaryColor}
                size={30}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <StatusBar animated={true} barStyle={'light-content'} />

      <ScrollView
        style={styles.container}
        ref={(ref) => (this.scrollView = ref)}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     progressBackgroundColor={COLORS.primaryColor}
        //   />
        // }

        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({ animated: true })
        }
      >
        {allChats?.map((msg) => (
          <View
            style={{
              flexDirection: user === msg.author ? 'row-reverse' : 'row',
            }}
            key={msg.id + msg.author}
          >
            <View
              style={user === msg.author ? styles.myMessage : styles.message}
            >
              <View style={styles.msgHeader}>
                <Text style={styles.msgAuthor} numberOfLines={1}>
                  {msg.author}
                </Text>
                <Text style={styles.msgDate}>
                  {msg.datetime.split(' ')[0].slice(0, 10)}
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
          // paddingTop: 10,
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
        <TouchableOpacity
          onPress={() => {
            sendMessage();
            // this.scrollView.scrollToEnd({ animated: true });
          }}
        >
          <MaterialIcons name="send" color={COLORS.primaryColor} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
