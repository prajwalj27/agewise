import { View, Text } from 'react-native';
import React from 'react';

import styles from './style';
import { ScreenHeader } from '../../../components';

const Stories = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Stories" />
      <Text style={styles.text}>Here are the Stories</Text>
    </View>
  );
};

export default Stories;
