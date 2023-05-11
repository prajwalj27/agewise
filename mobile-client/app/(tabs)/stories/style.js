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
  },
  stories: {
    backgroundColor: COLORS.darkGrey,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontFamily: FONT.bold,
    color: COLORS.darkHeading,
    fontSize: SIZES.large,
    // textAlign: 'center'
  },
  subtitleSection: {
    borderBottomColor: COLORS.darkText,
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    marginBottom: 8,
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  subtitle: {
    fontFamily: FONT.medium,
    color: COLORS.darkText,
    fontSize: SIZES.small,
    // fontStyle: 'italic',
  },
  content: {
    textAlign: 'justify',
    fontFamily: FONT.regular,
    color: COLORS.darkHeading,
    fontSize: SIZES.regular,
    borderBottomColor: COLORS.darkText,
    borderBottomWidth: 0.5,
    padding: 10,
    paddingTop: 5,
    marginBottom: 12,
  },
  interactSection: {
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default styles;
