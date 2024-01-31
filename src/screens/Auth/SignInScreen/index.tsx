import { LockIcon, LogoApp, UserIcon } from '@/assets/icons';
import { validationError, validationSchema } from '@/common';
import { Box, Button, Modal, Spacer, TextField, TextInputField } from '@/components';
import { ETypeField } from '@/components/TextInput/types';
import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { ILoginFormData } from '@/interfaces/auth.interfaces';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignInScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { control, handleSubmit } = useForm<ILoginFormData>({
    defaultValues: { phoneNumber: '', password: '' },
  });

  const signIn = (values: ILoginFormData) => {
    console.log('values', values);
  };

  return (
    <Box flex ph={24} pt={insets.top + 40}>
      <TextField mb={32} size={32} fontFamily={theme.fonts.regular} centered>
        Đăng nhập
      </TextField>
      <TextInputField
        autoFocus
        leftLabel='Số điện thoại'
        iconLeft={<UserIcon width={20} height={20} />}
        control={control}
        name='phoneNumber'
        keyboardType='numeric'
        required
        rules={{
          required: 'Vui lòng nhập số điện thoại!',
          pattern: {
            value: validationSchema.phoneNumber,
            message: validationError.phoneNumber,
          },
        }}
      />
      <Spacer height={8} />
      <TextInputField
        leftLabel='Mật khẩu'
        iconLeft={<LockIcon width={20} height={20} />}
        control={control}
        name='password'
        type={ETypeField.PASSWORD}
        required
        rules={{
          required: 'Vui lòng nhập mật khẩu!',
          pattern: {
            value: validationSchema.password,
            message: validationError.password,
          },
        }}
      />
      <Button
        onPress={handleSubmit(signIn)}
        h={52}
        color={theme.colors.secondary}
        centered
        middle
        borderRadius={8}
        mv={32}
      >
        <TextField
          size={SIZE.fontPixel(16)}
          color={theme.colors.lightSixColor}
          fontFamily={theme.fonts.medium}
        >
          Đăng nhập
        </TextField>
      </Button>
      <TextField centered>
        Bạn chưa có tài khoản? <TextField color={theme.colors.secondary}>Đăng ký</TextField>
      </TextField>
    </Box>
  );
};
export default SignInScreen;
