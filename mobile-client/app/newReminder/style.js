import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBackground,
    flex: 1,
    padding: 20,
  },
  text: {
    color: COLORS.darkText,
    fontSize: SIZES.regular,
  },
  loginInputs: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primaryColor,
    marginTop: 10,
    borderRadius: 30,
  },
  textInput: {
    width: '100%',
    backgroundColor: 'white',
    height: 45,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    marginTop: 5,
  },
  textInput2: {
    width: '100%',
    backgroundColor: 'white',
    height: 200,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    marginTop: 5,
  },
});

export default styles;
