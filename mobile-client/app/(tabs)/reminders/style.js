import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBackground,
    flex: 1,
    padding: 20,
  },
  text: {
    color: COLORS.primaryColor,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
  },
  textAlt: {
    color: 'red',
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
  },
  card: {
    height: 100,
    backgroundColor: COLORS.darkGrey,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color: COLORS.darkHeading,
    fontFamily: FONT.bold,
    fontSize: SIZES.regular,
  },
});

export default styles;
