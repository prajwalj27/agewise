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

const NewStory = () => {
  const router = useRouter();

  const [user, setUser] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [allStories, setAllStories] = useState();

  const postStory = async () => {
    const newStory = {
      id: allStories?.length,
      author: user,
      datetime: new Date().toLocaleString().slice(0, 10),
      story: content,
      title: title,
      likes: Math.floor(Math.random() * 10 + 1),
    };

    try {
      const { data } = await axios.post(`${baseURL}/api/stories/new`, newStory);
      console.log(data);
    } catch (e) {
      console.log(e);
    }

    router.push('/stories');
  };

  useEffect(() => {
    const getAllStories = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/stories`);
        setAllStories(data);
      } catch (e) {
        console.log(e);
      }
    };

    getAllStories();
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
          Write a new <Text style={{ color: COLORS.primaryColor }}>Story</Text>!
        </Text>

        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Give an attractive title..."
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <Text style={styles.text}>Content</Text>
        <TextInput
          style={styles.textInput2}
          multiline={true}
          placeholder="Type something..."
          value={content}
          secureTextEntry={true}
          onChangeText={(text) => setContent(text)}
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
              postStory();
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewStory;
