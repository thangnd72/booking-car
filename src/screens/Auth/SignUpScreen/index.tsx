import { LockIcon, PhoneIcon, UserIcon } from '@/assets/icons';
import { validationError, validationSchema } from '@/common';
import { Box, Button, Spacer, TextField, TextInputField } from '@/components';
import { ETypeField } from '@/components/TextInput/types';
import { goBack } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { showError, showSuccess } from '@/helpers/toast';
import { ISignUpFormData, ISignUpResponse } from '@/interfaces/auth.interfaces';
import { useAppDispatch } from '@/stores';
import { signUpAction } from '@/stores/auth';
import { setGlobalLoading } from '@/stores/client';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

export const SignUpScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, watch } = useForm<ISignUpFormData>({
    defaultValues: {
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      fullName: '',
    },
  });
  const pwd = watch('password');

  const _onSuccess = (response: ISignUpResponse) => {
    dispatch(setGlobalLoading(false));
    showSuccess('Đăng ký tài khoản thành công!');
    goBack();
  };

  const _signUp = (values: ISignUpFormData) => {
    dispatch(setGlobalLoading(true));
    dispatch(
      signUpAction({
        ...values,
        onSuccess: (response) => _onSuccess(response),
        onError: (err) => {
          dispatch(setGlobalLoading(false));
          showError(err.message);
        },
      }),
    );
  };

  return (
    <Box p={16} flex={1} color={theme.colors.backgroundColor}>
      <TextField centered size={24} mb={24} mt={8} fontFamily={theme.fonts.medium}>
        Thông tin đăng ký
      </TextField>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextInputField
          autoFocus
          leftLabel='Số điện thoại'
          iconLeft={<PhoneIcon width={20} height={20} />}
          control={control}
          name='phoneNumber'
          keyboardType='numeric'
          showRequiredMark
          required
          rules={{
            required: 'Vui lòng nhập số điện thoại!',
            pattern: {
              value: validationSchema.phoneNumber,
              message: validationError.phoneNumber,
            },
          }}
        />
        <Spacer height={16} />
        <TextInputField
          leftLabel='Họ tên'
          iconLeft={<UserIcon width={20} height={20} />}
          control={control}
          name='fullName'
          showRequiredMark
          required
          rules={{
            required: 'Vui lòng nhập họ tên!',
          }}
        />
        <Spacer height={16} />
        <TextInputField
          leftLabel='Mật khẩu'
          iconLeft={<LockIcon width={20} height={20} />}
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
          iconLeft={<LockIcon width={20} height={20} />}
          control={control}
          name='confirmPassword'
          type={ETypeField.PASSWORD}
          showRequiredMark
          required
          rules={{
            required: 'Vui lòng xác nhận mật khẩu!',
            validate: (value) => value === pwd || 'Không khớp mật khẩu',
          }}
        />
        <Spacer height={32} />
        <Button
          onPress={handleSubmit(_signUp)}
          h={52}
          color={theme.colors.primary}
          centered
          middle
          borderRadius={8}
          mv={32}
        >
          <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            Đăng nhập
          </TextField>
        </Button>
      </ScrollView>
    </Box>
  );
};
