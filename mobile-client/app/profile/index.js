import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';
import { COLORS, FONT, SIZES } from '../../constants/theme';
// import { users, seniorCitizenNames } from '../../constants/dummy';
import { setLoggedInUser, getLoggedInUser } from '../../utils/userLogin';

const Profile = () => {
  const router = useRouter();


  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();

  const handleLogin = (usernameInput, passwordInput) => {
    // Check if the input fields are not empty
    if (usernameInput === '' || passwordInput === '') {
      alert('Login fields can not remain empty');
      return;
    }

    // check if the login details are correct
    const checkUsername = (obj) => obj.username === usernameInput;
    const checkPassword = (obj) => obj.password === passwordInput;

    if (users.some(checkUsername) && users.some(checkPassword)) {
      // Store the login details in asyncStorage
      setLoggedInUser(usernameInput, passwordInput);
      console.log(`Logged In as ${username}`);
      router.push('/stories');
      setPassword('');
      setUsername('');
    } else {
      alert('Enter valid Login details!');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Logged Out');
      router.push('/login');
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    getLoggedInUser(setUser)
  })

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.darkBackground },
          headerShadowVisible: false,
          headerTitle: '',
          headerLeft: () => <></>,
          headerRight: () => <></>,
        }}
      />
      <StatusBar animated={true} barStyle={'light-content'} />

      <View style={styles.loginInputs}>
        <Text
          style={{
            color: 'white',
            fontFamily: FONT.bold,
            fontSize: SIZES.large,
            textAlign: 'center',
            marginBottom: 33,
          }}
        >
          See you later <Text style={{ color: COLORS.primaryColor }}>{user}</Text>!
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
              paddingTop: 8,
              color: 'white',
            }}
            onPress={logout}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
