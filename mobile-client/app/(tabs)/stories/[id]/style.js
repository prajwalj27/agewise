import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../../../../constants/theme';

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
  stories: {
    backgroundColor: COLORS.darkGrey,
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontFamily: FONT.bold,
    color: COLORS.darkHeading,
    fontSize: SIZES.large,
    marginBottom: 10,
  },
  subtitleSection: {
    paddingBottom: 5,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontFamily: FONT.medium,
    color: COLORS.darkText,
    fontSize: SIZES.small,
  },
  content: {
    textAlign: 'justify',
    fontFamily: FONT.regular,
    color: COLORS.darkHeading,
    fontSize: SIZES.regular,
  },
  interactSection: {
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
