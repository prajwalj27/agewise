import { View, Text, ScrollView, TouchableOpacity, Share } from 'react-native';
import React, { useState } from 'react';
import LikeIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SaveIcons from 'react-native-vector-icons/MaterialIcons';
import ShareIcon from 'react-native-vector-icons/Feather';
import { useRouter } from 'expo-router';

import styles from './style';
import { ScreenHeader } from '../../../components';
import { stories } from '../../../constants/dummy';
import { COLORS } from '../../../constants/theme';

const StoryCard = ({ id, title, author, story, likes }) => {
  const router = useRouter()
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
          Posted by {author} &#8226; 2 days ago
        </Text>
      </View>
      <TouchableOpacity onPress={() => {router.push(`stories/${id}`)}}>
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
      <Text style={styles.subtitle}>{likes} likes</Text>
    </View>
  );
};

const Stories = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Stories" />

      <ScrollView>
        {stories.map((story) => (
          <StoryCard
            title={story.title}
            author={story.author}
            story={story.story}
            likes={story.likes}
            id={story.id}
            key={story.id}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;
