import { View, Text, TouchableOpacity, ScrollView, Share } from 'react-native';
import React, { useEffect, useState } from 'react';
import ShareIcon from 'react-native-vector-icons/Feather';
import LikeIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SaveIcons from 'react-native-vector-icons/MaterialIcons';
import SoundIcon from 'react-native-vector-icons/AntDesign';
import { usePathname, Stack } from 'expo-router';
import * as Speech from 'expo-speech';
import axios from 'axios'

import { COLORS, FONT, SIZES } from '../../../../constants/theme';
import styles from './style';
import { stories } from '../../../../constants/dummy';
import { baseURL } from '../../../../config';

const Story = () => {
  const pathName = usePathname();
  const storyId = pathName.split('/')[2];

  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [story, setStory] = useState()

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${story?.title} 

${story?.story}

- by ${stories[storyId].author}
`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const getStory = async () => {
      try {
        const {data} = await axios.get(`${baseURL}/api/stories/${storyId}`)
        setStory(data)
      } catch (e) {
        console.log(e)
      }
    }

    getStory()
  }, [])

  useEffect(() => {
    isSpeaking ? Speech.speak(story?.story) : Speech.stop();
  }, [isSpeaking]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.darkBackground },
          headerShadowVisible: true,
          headerTitle: '',
          headerTintColor: COLORS.primaryColor,
        }}
      />

      <Text style={styles.title}>{story?.title}</Text>

      <View style={styles.subtitleSection}>
        <Text style={styles.subtitle}>
          Posted by {story?.author} &#8226; 2 days ago
        </Text>
        <TouchableOpacity onPress={() => setIsSpeaking(!isSpeaking)}>
          <SoundIcon name="sound" color={COLORS.primaryColor} size={25} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.content}>{story?.story}</Text>

        <View style={styles.interactSection}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => setLike(!like)}>
              <LikeIcons
                name={like ? 'cards-heart' : 'cards-heart-outline'}
                color={COLORS.primaryColor}
                size={30}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleShare}>
              <ShareIcon name="send" color={COLORS.primaryColor} size={27} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setSave(!save)}>
            <SaveIcons
              name={save ? 'bookmark' : 'bookmark-outline'}
              color={COLORS.primaryColor}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>{story?.likes} likes</Text>
      </ScrollView>
    </View>
  );
};

export default Story;
