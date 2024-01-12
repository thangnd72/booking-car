import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    maxWidth: 358,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.bgSuccessColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    marginLeft: 6,
  },
});

export default styles;
