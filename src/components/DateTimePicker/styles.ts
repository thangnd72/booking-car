import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  datePickerContainer: {
    backgroundColor: theme.colors.lightThreeColor,
    height: 48,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelWrapper: {
    flexDirection: 'row',
  },
  leftLabel: {
    flex: 1,
    fontSize: 12,
  },
  rightLabel: {
    fontSize: 12,
    color: theme.colors.darkTwoColor,
  },
  iconRight: {
    paddingHorizontal: 16,
  },
  dateTxt: {
    paddingLeft: 16,
    fontSize: 14,
  },
  errorText: {
    color: theme.colors.errorColor,
    fontSize: 15,
    paddingTop: 5,
  },
});

export default styles;
