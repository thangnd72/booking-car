import { SIZE } from '@/helpers/size';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZE.scaleW(8),
    paddingVertical: SIZE.scaleH(16),
  },
  containerItem: {
    gap: 8,
    paddingBottom: 16,
  },
});

export default styles;