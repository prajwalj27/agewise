import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import LikeIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SaveIcons from 'react-native-vector-icons/MaterialIcons';
import ShareIcon from 'react-native-vector-icons/Feather';
import { useRouter } from 'expo-router';
import axios from 'axios';

import styles from './style';
import { ScreenHeader } from '../../../components';
import { COLORS, FONT, SIZES } from '../../../constants/theme';
import { baseURL } from '../../../config';

const StoryCard = ({ id, title, author, story, likes, datetime }) => {
  const router = useRouter();
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${title} 

${story}

- by ${author}
`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.stories}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.subtitleSection}>
        <Text style={styles.subtitle}>
          Posted by {author}  &#8226;  {datetime}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.push(`stories/${id}`);
        }}
      >
        <Text style={styles.content} numberOfLines={5}>
          {story}
        </Text>
      </TouchableOpacity>

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
      <Text style={styles.subtitle}>{likes.toLocaleString()} likes</Text>
    </View>
  );
};

const Stories = () => {
  const router = useRouter();

  const [allStories, setAllStories] = useState();
  const [refreshing, setRefreshing] = useState(false)

  const getAllStories = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/stories`);
      setAllStories(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllStories();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getAllStories();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} 
      refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={COLORS.primaryColor}
          />
        }
    >
      <ScreenHeader title="Stories" />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={{
            fontFamily: FONT.regular,
            color: COLORS.darkHeading,
            fontSize: SIZES.large,
            marginBottom: 20,
          }}
        >
          Recent Stories
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primaryColor,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            height: 45,
            width: 90,
          }}
          onPress={() => {
            router.push('/newStory');
          }}
        >
          <Text
            style={{
              fontFamily: FONT.bold,
              color: COLORS.darkHeading,
              fontSize: 20,
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>

      {allStories?.map((story) => (
        <StoryCard
          title={story.title}
          author={story.author}
          story={story.story}
          likes={story.likes}
          datetime={story.datetime}
          id={story.id}
          key={story.id}
        />
      )).reverse()}
    </ScrollView>
  );
};

export default Stories;
