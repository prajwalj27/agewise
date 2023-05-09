import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';
import { COLORS, FONT, SIZES } from '../../constants/theme';
import { users } from '../../constants/dummy';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const storeData = async (usernameInput, passwordInput) => {
    const value = { username: usernameInput, password: passwordInput };
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      console.warn(e);
    }
  };

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
      storeData(usernameInput, passwordInput);
      router.push('/home');
      setPassword('');
      setUsername('');
    } else {
      alert('Enter valid Login details!')
    }
  };

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
          Welcome to AgeWise
        </Text>

        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button}>
          <Text
            style={{
              fontSize: 22,
              textTransform: 'uppercase',
              fontWeight: 'bold',
              textAlign: 'center',
              paddingTop: 8,
              color: 'white',
            }}
            onPress={() => handleLogin(username, password)}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
