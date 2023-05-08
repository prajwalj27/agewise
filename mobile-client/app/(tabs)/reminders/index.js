import { View, Text } from 'react-native';
import React from 'react';

import styles from './style';
import { ScreenHeader } from '../../../components';

const Reminders = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Reminders" />

      <Text style={styles.text}>Here are the Reminders</Text>
    </View>
  );
};

export default Reminders;
