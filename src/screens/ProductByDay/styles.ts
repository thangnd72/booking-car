import { SIZE } from '@/helpers/size';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapperProduct: {
    marginHorizontal: SIZE.scaleW(8),
    paddingVertical: SIZE.scaleH(16),
  },
  img: {
    height: SIZE.scaleH(200),
  },
  containerItem: {
    gap: 8,
    paddingBottom: 16,
  },
  searchInput: {
    width: '100%',
    paddingLeft: 8,
    paddingRight: 16,
  },
});

export default styles;
