import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.scaleW(16),
    paddingTop: 80,
    backgroundColor: theme.colors.backgroundColor,
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
