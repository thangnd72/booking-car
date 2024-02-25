import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flowerImg: {
    width: 68,
    height: 68,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.colors.darkFourColor,
    shadowOffset: {
      width: 0.5,
      height: 2,
    },
    shadowOpacity: 0.6,
    elevation: 6,
  },
});

export default styles;
