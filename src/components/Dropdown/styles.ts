import { StyleSheet } from 'react-native';
import theme from '@/helpers/theme';
import { SIZE } from '@/helpers/size';

const dropdownWidth = SIZE.SCREEN_WIDTH - 32;

export const styles = StyleSheet.create({
  button: {
    height: 52,
    zIndex: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.lightFourColor,
  },
  buttonText: {
    flex: 1,
    paddingLeft: 16,
  },
  icon: {
    marginRight: 16,
    transform: [{ rotate: '180deg' }],
  },
  dropdown: {
    width: '100%',
    position: 'absolute',
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: theme.colors.lightThreeColor,
    borderColor: theme.colors.darkFourColor,
  },
  overlay: {
    height: '100%',
    width: dropdownWidth,
    marginHorizontal: 16,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  label: {
    marginBottom: 3,
  },
  errorText: {
    color: theme.colors.errorColor,
    fontSize: 15,
    paddingTop: 5,
  },
});
