import { StyleSheet } from 'react-native';

import theme from '@/helpers/theme';

export const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundColor,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  textInput: {
    flex: 1,
    height: 44,
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
    fontSize: 14,
    color: theme.colors.textColor,
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
