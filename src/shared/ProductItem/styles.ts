import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  thumbnail: {
    flex: 1,
    resizeMode: 'cover',
    height: SIZE.scaleH(180),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  shadow: {
    shadowColor: theme.colors.darkFourColor,
    shadowOffset: {
      width: 0.5,
      height: 2,
    },
    shadowOpacity: 0.4,
    elevation: 6,
    width: (SIZE.WIDTH - 40) / 2,
  },
});

export default styles;
