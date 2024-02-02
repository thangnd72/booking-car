import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containLoading: {
    backgroundColor: theme.colors.modalColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  lottieView: {
    width: 50,
    height: 50,
  },
});
