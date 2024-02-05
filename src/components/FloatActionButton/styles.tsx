import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: theme.colors.primary,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: 30,
    borderRadius: 25,
  },
});
