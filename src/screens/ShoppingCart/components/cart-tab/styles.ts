import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
  },
  tabBarItem: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  selected: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
  text: {
    textAlign: 'center',
    fontFamily: theme.fonts.medium,
    paddingBottom: 6,
  },
});

export default styles;
