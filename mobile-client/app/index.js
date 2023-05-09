import React from 'react';
import { Stack, useRouter, Tabs, Link, Redirect } from 'expo-router';
import { StatusBar } from 'react-native';

const index = () => {
  const router = useRouter();
  return (
    <>
      <Redirect href="/login" />
    </>
  );
};

export default index;
