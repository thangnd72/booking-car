import { StyleSheet } from 'react-native';

import theme from '@/helpers/theme';

class CheckboxStyles {
  private static _styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.lightFiveColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  public static styles = {
    ...this._styles,
  };
}

export default CheckboxStyles.styles;
