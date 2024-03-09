import { LoginIcon } from '@/assets/icons';
import { validationError, validationSchema } from '@/common';
import { Box, Button, Spacer, TextField, TextInputField } from '@/components';
import { ETypeField } from '@/components/TextInput/types';
import { goBack } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { showError, showSuccess } from '@/helpers/toast';
import { ISignUpFormData } from '@/interfaces/auth.interfaces';
import { useAppDispatch } from '@/stores';
import { signUpAction } from '@/stores/auth';
import { setGlobalLoading } from '@/stores/client';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

export const SignUpScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, watch } = useForm<ISignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
      enterThePassword: '',
      userName: '',
    },
  });
  const pwd = watch('password');

  const _onSuccess = () => {
    dispatch(setGlobalLoading(false));
    showSuccess('Đăng ký tài khoản thành công!');
    goBack();
  };

  const _signUp = (values: ISignUpFormData) => {
    dispatch(setGlobalLoading(true));
    dispatch(
      signUpAction({
        ...values,
        onSuccess: () => _onSuccess(),
        onError: (err) => {
          dispatch(setGlobalLoading(false));
          showError(err.message);
        },
      }),
    );
  };

  return (
    <Box p={16} flex={1} color={theme.colors.backgroundColor}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box middle pb={36}>
          <LoginIcon />
        </Box>
        <TextInputField
          autoFocus
          leftLabel='Email'
          autoCapitalize='none'
          control={control}
          name='email'
          showRequiredMark
          required
          rules={{
            required: 'Vui lòng nhập email!',
            pattern: {
              value: validationSchema.email,
              message: validationError.email,
            },
          }}
        />
        <Spacer height={16} />
        <TextInputField
          leftLabel='Họ tên'
          control={control}
          name='userName'
          showRequiredMark
          required
          rules={{
            required: 'Vui lòng nhập họ tên!',
          }}
        />
        <Spacer height={16} />
        <TextInputField
          leftLabel='Mật khẩu'
          control={control}
          name='password'
          type={ETypeField.PASSWORD}
          showRequiredMark
          required
          rules={{
            required: 'Vui lòng nhập mật khẩu!',
            pattern: {
              value: validationSchema.password,
              message: validationError.password,
            },
          }}
        />
        <Spacer height={16} />
        <TextInputField
          leftLabel='Xác nhận mật khẩu'
          // iconLeft={<LockIcon width={20} height={20} />}
          control={control}
          name='enterThePassword'
          type={ETypeField.PASSWORD}
          showRequiredMark
          required
          rules={{
            required: 'Vui lòng xác nhận mật khẩu!',
            validate: (value) => value === pwd || 'Không khớp mật khẩu',
          }}
        />
        <Spacer height={16} />
        <Button
          onPress={handleSubmit(_signUp)}
          h={44}
          color={theme.colors.primary}
          centered
          middle
          borderRadius={8}
          mv={32}
        >
          <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            Đăng ký
          </TextField>
        </Button>
      </ScrollView>
    </Box>
  );
};
