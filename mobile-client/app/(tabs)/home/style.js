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
});

export default styles;
