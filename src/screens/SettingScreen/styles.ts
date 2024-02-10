import { SIZE } from '@/helpers/size';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.scaleW(16),
    paddingTop: 80,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraWrapper: {
    position: 'absolute',
    bottom: 0,
    left: SIZE.SCREEN_WIDTH / 2,
  },
});

export default styles;
