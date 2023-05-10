import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import LikeIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SaveIcons from 'react-native-vector-icons/MaterialIcons';
import ShareIcon from 'react-native-vector-icons/Feather';

import styles from './style';
import { ScreenHeader } from '../../../components';
import { stories } from '../../../constants/dummy';
import { COLORS } from '../../../constants/theme';

const StoryCard = ({ title, author, story, likes }) => {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);

  return (
    <View style={styles.stories}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.subtitleSection}>
        <Text style={styles.subtitle}>
          Posted by {author} &#8226; 2 days ago
        </Text>
        {/* <Text style={styles.subtitle}>2 days ago</Text> */}
      </View>
      <TouchableOpacity>
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

          <TouchableOpacity>
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
            key={story.id}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;
