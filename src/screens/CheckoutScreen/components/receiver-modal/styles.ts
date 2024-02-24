import theme from '@/helpers/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
  },
  dropdown: {
    height: 52,
    // zIndex: 1,
    borderRadius: 5,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: theme.colors.lightFourColor,
  },
});

export default styles;
