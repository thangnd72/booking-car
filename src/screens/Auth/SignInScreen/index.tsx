import { LoginIcon } from '@/assets/icons';
import { EAuthToken, validationError, validationSchema } from '@/common';
import { Box, Button, Checkbox, Spacer, TextField, TextInputField } from '@/components';
import { ETypeField } from '@/components/TextInput/types';
import { navigate } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { showError, showSuccess } from '@/helpers/toast';
import { ILoginFormData } from '@/interfaces/auth.interfaces';
import { APP_SCREEN } from '@/navigators/screen-types';
import { useAppDispatch } from '@/stores';
import { logInAction } from '@/stores/auth';
import { setAccessToken, setGlobalLoading, setProfile } from '@/stores/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignInScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<ILoginFormData>({
    defaultValues: { email: 'thangnd72@yopmail.com', password: 'Abc@1234' },
  });

  const [checked, setChecked] = React.useState<boolean>(false);

  const signIn = (values: ILoginFormData) => {
    dispatch(setGlobalLoading(true));
    dispatch(
      logInAction({
        ...values,
        onSuccess: (response) => {
          showSuccess('Đăng nhập thành công!');
          dispatch(setGlobalLoading(false));
          dispatch(setAccessToken(response.token));
          AsyncStorage.setItem(EAuthToken.ACCESS_TOKEN, response.token);
          // dispatch(setProfile(response.profile));
          navigate(APP_SCREEN.HOME);
        },
        onError: (err) => {
          console.log('err', err);
          dispatch(setGlobalLoading(false));
          showError(err.message);
        },
      }),
    );
  };

  const _onNavigateForgotPassword = () => {
    navigate(APP_SCREEN.FORGOT_PASSWORD);
  };
  return (
    <Box flex={1} ph={24} pt={insets.top + 10} color={theme.colors.backgroundColor}>
      <TextField mb={32} size={20} fontFamily={theme.fonts.semiBold} centered>
        Đăng nhập
      </TextField>
      <Box middle pb={36}>
        <LoginIcon />
      </Box>
      <TextInputField
        autoFocus
        leftLabel='Email'
        autoCapitalize='none'
        control={control}
        name='email'
        required
        rules={{
          required: 'Vui lòng nhập email!',
          pattern: {
            value: validationSchema.email,
            message: validationError.email,
          },
        }}
      />
      <Spacer height={12} />
      <TextInputField
        leftLabel='Mật khẩu'
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
      <Box mt={12} direction='row' middle between>
        <Box direction='row' gap={8} middle>
          <Checkbox selected={checked} onSelected={() => setChecked(!checked)} />
          <TextField size={12} color={theme.colors.darkTwoColor}>
            Nhớ mật khẩu
          </TextField>
        </Box>
        <TextField
          size={12}
          color={theme.colors.textColor}
          fontFamily={theme.fonts.medium}
          onPress={_onNavigateForgotPassword}
        >
          Quên mật khẩu
        </TextField>
      </Box>

      <Button
        onPress={handleSubmit(signIn)}
        h={44}
        color={theme.colors.primary}
        centered
        middle
        borderRadius={8}
        mv={32}
      >
        <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.semiBold}>
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
