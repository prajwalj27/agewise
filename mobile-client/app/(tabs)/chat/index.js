import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

import styles from './style';
import { ScreenHeader } from '../../../components';
import { discussions } from '../../../constants/dummy';

const Chat = () => {
  const router = useRouter();
  // console.log(discussions[0])
  return (
    <View style={styles.container}>
      <ScreenHeader title="Chat" />
      <Text style={styles.heading}>Top Discussions</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
      
        {discussions && discussions.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.discussions}
            onPress={() => router.push(`/chatRoom/${chat.id}`)}
          >
            <Text style={styles.title}>{chat.topic}</Text>
            <Text style={styles.subtitle}>Members joined: {chat.members}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Chat;
