import { SIZE } from '@/helpers/size';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  thumbnail: {
    resizeMode: 'cover',
    height: SIZE.scaleH(180),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default styles;
