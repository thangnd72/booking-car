import { SIZE } from '@/helpers/size';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loadingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  lottieView: {
    height: SIZE.scaleH(100),
    width: SIZE.scaleW(100),
  },
});
