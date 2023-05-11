import React from 'react';
import { Stack, useRouter, Tabs, Link, Redirect } from 'expo-router';
import { StatusBar } from 'react-native';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

const index = () => {
  const router = useRouter();
  return (
    <>
      {/* <Redirect href="/chatRoom/1" /> */}
      <Redirect href="/login" />
    </>
  );
};

export default index;
