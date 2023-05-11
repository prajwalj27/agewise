import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBackground,
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
  },
  msgText: {
    color: COLORS.darkText,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    marginBottom: 10,
  },
  message: {
    backgroundColor: COLORS.darkGrey,
    marginBottom: 15,
    borderRadius: 10,
    minWidth: '60%',
    maxWidth: '80%',
    padding: 10,
    borderBottomLeftRadius: 0,
  },
  myMessage: {
    backgroundColor: COLORS.darkGrey,
    marginBottom: 15,
    borderRadius: 10,
    minWidth: '60%',
    maxWidth: '80%',
    padding: 10,
    borderBottomRightRadius: 0,
  },
  msgHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  msgAuthor: {
    color: COLORS.primaryColor,
    fontFamily: FONT.bold,
    fontSize: 18,
  },
  msgDate: {
    color: COLORS.darkText,
    fontFamily: FONT.regular,
    fontSize: 14,
    textAlign: 'right',
  },
});

export default styles;
