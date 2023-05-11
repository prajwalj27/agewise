import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBackground,
    flex: 1,
    padding: 20,
  },
  text: {
    color: COLORS.darkText,
    fontSize: SIZES.regular,
    fontFamily: FONT.regular,
  },
  heading: {
    color: COLORS.darkHeading,
    fontSize: SIZES.regular,
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    marginBottom: 20,
  },
  discussions: {
    height: 100,
    width: '100%',
    backgroundColor: COLORS.darkGrey,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    marginBottom: 20,
  },
  subtitle: {
    color: COLORS.darkText,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
  },
  title: {
    color: COLORS.primaryColor,
    fontFamily: FONT.bold,
    fontSize: SIZES.regular,
  },
});

export default styles;
