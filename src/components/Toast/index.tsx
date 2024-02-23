/* eslint-disable react/react-in-jsx-scope */
import { View } from 'react-native';
import styles from './styles';
import theme from '@/helpers/theme';
import { CheckedAroundIcon, ErrorAroundIcon } from '@/assets/icons';
import { TextField } from '../TextField';

interface IToastSuccess {
  message: string;
}

export const ToastSuccess = ({ message }: IToastSuccess) => {
  return (
    <View style={styles.container}>
      <CheckedAroundIcon fill={theme.colors.lightFiveColor} width={20} height={20} />
      <TextField pl={6} color={theme.colors.textColor}>
        {message}
      </TextField>
    </View>
  );
};

interface IToastError {
  message: string;
}

export const ToastError = ({ message }: IToastError) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderLeftWidth: 4,
          borderLeftColor: theme.colors.errorColor,
          backgroundColor: theme.colors.bgErrorColor,
        },
      ]}
    >
      <ErrorAroundIcon fill={theme.colors.lightFiveColor} width={20} height={20} />
      <TextField pl={6} color={theme.colors.textColor}>
        {message}
      </TextField>
    </View>
  );
};
