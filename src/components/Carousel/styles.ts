import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  imageCarousel: {
    width: SIZE.SCREEN_WIDTH - SIZE.scaleW(32),
    height: SIZE.scaleH(80),
    resizeMode: 'cover',
    borderRadius: 5,
  },
  circleDiv: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dotCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 4,
    backgroundColor: theme.colors.primary,
  },
});
