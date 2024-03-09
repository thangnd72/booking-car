import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 48,
    height: 48,
    lineHeight: 46,
    fontSize: 18,
    fontFamily: theme.fonts.semiBold,
    borderWidth: 1,
    borderColor: theme.colors.borderCodeColor,
    color: theme.colors.textColor,
    textAlign: 'center',
    borderRadius: 4,
  },
  focusCell: {
    borderColor: theme.colors.primary,
  },
});

export default styles;
