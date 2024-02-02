import { StyleSheet } from 'react-native';

import theme from '@/helpers/theme';

export const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.lightOneColor,
  },
  textInput: {
    flex: 1,
    height: 52,
    color: theme.colors.darkOneColor,
    fontFamily: theme.fonts.regular,
    fontSize: 15,
  },
  errorText: {
    color: theme.colors.errorColor,
    fontSize: 12,
    paddingTop: 5,
  },
  label: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  leftLabel: {
    fontSize: 12,
  },
  rightLabel: {
    fontSize: 12,
    color: theme.colors.darkOneColor,
  },
  iconRight: {
    paddingHorizontal: 12,
    color: theme.colors.darkOneColor,
  },
});
