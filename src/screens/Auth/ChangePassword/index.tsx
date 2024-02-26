import { ArrowLeftIcon, LockIcon } from '@/assets/icons';
import { validationError, validationSchema } from '@/common';
import { Box, Button, Spacer, TextField, TextInputField } from '@/components';
import { ETypeField } from '@/components/TextInput/types';
import { goBack, navigate, reset } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { showError, showSuccess } from '@/helpers/toast';
import { IChangePasswordParams } from '@/interfaces/auth.interfaces';
import { APP_SCREEN } from '@/navigators/screen-types';
import { useAppDispatch } from '@/stores';
import { changePasswordAction } from '@/stores/auth';
import { logout } from '@/stores/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ChangePasswordScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { control, watch, handleSubmit } = useForm<IChangePasswordParams>({
    defaultValues: {},
  });

  const newPw = watch('newPassword');

  const _changePassword = (values: IChangePasswordParams) => {
    dispatch(
      changePasswordAction({
        ...values,
        onSuccess: () => {
          showSuccess('Đăng nhập thành công!');
          dispatch(logout());
          AsyncStorage.clear();
          reset(APP_SCREEN.HOME);
          navigate(APP_SCREEN.HOME);
        },
        onError: (err) => {
          showError(err.message);
        },
      }),
    );
  };

  return (
    <Box flex={1} ph={24} pt={insets.top} color={theme.colors.backgroundColor}>
      <Box direction='row' middle gap={8} between>
        <Button onPress={goBack}>
          <ArrowLeftIcon />
        </Button>
        <TextField size={20} fontFamily={theme.fonts.medium} color={theme.colors.textColor}>
          Đổi mật khẩu
        </TextField>
        <Box w={24} />
      </Box>
      <Box mt={48}>
        <TextInputField
          autoFocus
          leftLabel='Mật khẩu cũ'
          iconLeft={<LockIcon width={20} height={20} />}
          control={control}
          type={ETypeField.PASSWORD}
          showRequiredMark
          name='oldPassword'
          required
          rules={{
            required: 'Vui lòng nhập mật khẩu cũ!',
          }}
        />
        <Spacer height={8} />
        <TextInputField
          leftLabel='Mật khẩu mới'
          iconLeft={<LockIcon width={20} height={20} />}
          control={control}
          name='newPassword'
          type={ETypeField.PASSWORD}
          showRequiredMark
          required
          rules={{
            required: 'Vui lòng nhập mật khẩu mới!',
            pattern: {
              value: validationSchema.password,
              message: validationError.password,
            },
          }}
        />
        <Spacer height={8} />
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
            validate: (value) => value === newPw || 'Không khớp mật khẩu',
          }}
        />
        <Button
          onPress={handleSubmit(_changePassword)}
          h={52}
          color={theme.colors.primary}
          centered
          middle
          borderRadius={8}
          mv={32}
        >
          <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            Xác nhận
          </TextField>
        </Button>
      </Box>
    </Box>
  );
};
export default ChangePasswordScreen;
