import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerMessage: {
    paddingTop: SIZE.scaleH(10),
    flex: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: SIZE.scaleW(16),
    color: theme.colors.textColor,
    fontSize: SIZE.fontPixel(15),
    minHeight: SIZE.scaleH(45),
    paddingBottom: SIZE.scaleH(12),
    paddingTop: SIZE.scaleH(12),
    borderRadius: SIZE.scaleH(10),
    borderColor: theme.colors.lightTwoColor,
    borderWidth: 1,
  },
});

export default styles;
