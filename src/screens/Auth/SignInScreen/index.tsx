import { LockIcon, UserIcon } from '@/assets/icons';
import { validationError, validationSchema } from '@/common';
import { Box, Button, Spacer, TextField, TextInputField } from '@/components';
import { ETypeField } from '@/components/TextInput/types';
import { navigate } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { showError, showSuccess } from '@/helpers/toast';
import { ILoginFormData } from '@/interfaces/auth.interfaces';
import { APP_SCREEN } from '@/navigators/screen-types';
import { useAppDispatch } from '@/stores';
import { logInAction } from '@/stores/auth';
import { setAccessToken, setGlobalLoading, setProfile } from '@/stores/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignInScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<ILoginFormData>({
    defaultValues: { username: '', password: '' },
  });

  const signIn = (values: ILoginFormData) => {
    dispatch(setGlobalLoading(true));
    dispatch(
      logInAction({
        ...values,
        onSuccess: (response) => {
          showSuccess('Đăng nhập thành công!');
          dispatch(setGlobalLoading(false));
          dispatch(setAccessToken(response.accessToken));
          dispatch(setProfile(response.profile));
          navigate(APP_SCREEN.HOME);
        },
        onError: (err) => {
          dispatch(setGlobalLoading(false));
          showError(err.message);
        },
      }),
    );
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
        name='username'
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
        color={theme.colors.primary}
        centered
        middle
        borderRadius={8}
        mv={32}
      >
        <TextField size={16} color={theme.colors.lightSixColor} fontFamily={theme.fonts.medium}>
          Đăng nhập
        </TextField>
      </Button>
      <TextField centered>
        Bạn chưa có tài khoản?{' '}
        <TextField color={theme.colors.primary} onPress={() => navigate(APP_SCREEN.SIGN_UP)}>
          Đăng ký
        </TextField>
      </TextField>
    </Box>
  );
};
export default SignInScreen;
