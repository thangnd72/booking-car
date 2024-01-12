import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tabBarItem: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  selected: {
    borderBottomColor: theme.colors.darkOneColor,
    borderBottomWidth: 2,
  },
  text: {
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: theme.fonts.bold,
  },
});

export default styles;
