import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    maxWidth: 358,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.lightFiveColor,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftColor: theme.colors.successColor,
    borderLeftWidth: 4,
  },
});

export default styles;
