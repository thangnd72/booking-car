import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: theme.colors.darkFourColor,
    shadowOffset: {
      width: 0.5,
      height: 2,
    },
    shadowOpacity: 0.4,
    elevation: 6,
  },

  avatarImg: {
    width: SIZE.scaleW(70),
    height: SIZE.scaleH(70),
    borderRadius: 50,
  },
});

export default styles;
