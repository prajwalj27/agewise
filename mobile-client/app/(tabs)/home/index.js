import { View, Text } from 'react-native';
import React from 'react';

import styles from './style';
import { ScreenHeader } from '../../../components';

const Home = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Home" />
      <Text style={styles.text}>Here is the Home Screen</Text>
    </View>
  );
};

export default Home;
