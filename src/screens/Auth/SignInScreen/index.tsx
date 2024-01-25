import React from 'react';
import styles from './styles';
import { Box, Button, FastImg, Spacer, TextField, TextInputField } from '@/components';
import { useForm } from 'react-hook-form';
import { validationError, validationSchema } from '@/common';
import { ILoginFormData } from '@/interfaces/auth.interfaces';
import theme from '@/helpers/theme';
import { ETypeField } from '@/components/TextInput/types';

const SignIn: React.FC = () => {
  const { control, handleSubmit } = useForm<ILoginFormData>({
    defaultValues: { phoneNumber: '', password: '' },
  });

  const signIn = (values: ILoginFormData) => {
    console.log('values', values);
  };

  return (
    <Box flex ph={24} pt={120}>
      <TextField mb={16} size={24} fontFamily={theme.fonts.bold} centered>
        Đăng nhập
      </TextField>
      <TextInputField
        leftLabel='Số điện thoại'
        control={control}
        name='phoneNumber'
        keyboardType='numeric'
        required
        rules={{
          required: 'Password is required',
          pattern: {
            value: validationSchema.phoneNumber,
            message: validationError.phoneNumber,
          },
        }}
      />
      <Spacer height={16} />
      <TextInputField
        leftLabel='Mật khẩu'
        control={control}
        name='password'
        required
        rules={{
          required: 'Password is required',
          pattern: {
            value: validationSchema.password,
            message: validationError.password,
          },
        }}
      />
      <Button
        onPress={handleSubmit(signIn)}
        h={52}
        color={theme.colors.primary}
        centered
        middle
        borderRadius={8}
        mt={16}
      >
        <TextField>Đăng nhập</TextField>
      </Button>
    </Box>
  );
};
export default SignIn;
