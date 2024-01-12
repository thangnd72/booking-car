import { StyleSheet } from 'react-native';
import theme from '@/helpers/theme';

export const styles = StyleSheet.create({
  circleActive: {
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: theme.colors.black,
    shadowOpacity: 0.4,
    elevation: 4,
  },
  container: {
    borderWidth: 1,
  },
});
