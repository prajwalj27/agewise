import { View, Text } from 'react-native';
import React from 'react';

import styles from './style';
import { ScreenHeader } from '../../../components';

const Chat = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Chat" />
      <Text style={styles.text}>Here are your Chats</Text>
    </View>
  );
};

export default Chat;
