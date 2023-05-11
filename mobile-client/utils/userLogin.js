import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLoggedInUser = async (setUser) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      const userData = JSON.parse(jsonValue);
      setUser(userData.username);
      return userData;
    } catch (e) {
      // error reading value
    }
}

export const setLoggedInUser = async (usernameInput, passwordInput) => {
  const value = { username: usernameInput, password: passwordInput };
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      console.warn(e);
    }
}