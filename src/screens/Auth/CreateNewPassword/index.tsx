import { NewPasswordIcon } from '@/assets/icons';
import { validationError, validationSchema } from '@/common';
import { Box, Button, Spacer, TextField, TextInputField } from '@/components';
import { ETypeField } from '@/components/TextInput/types';
import theme from '@/helpers/theme';
import { useAppDispatch } from '@/stores';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

export const CreateNewPasswordScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { control, watch, handleSubmit } = useForm<any>({
    defaultValues: {},
  });

  const newPw = watch('newPassword');

  const _createNewPassword = (values: any) => {
    // dispatch(
    //   changePasswordAction({
    //     ...values,
    //     onSuccess: () => {
    //       showSuccess('Đăng nhập thành công!');
    //       dispatch(logout());
    //       AsyncStorage.clear();
    //       reset(APP_SCREEN.HOME);
    //       navigate(APP_SCREEN.HOME);
    //     },
    //     onError: (err) => {
    //       showError(err.message);
    //     },
    //   }),
    // );
  };

  return (
    <Box p={16} flex={1} color={theme.colors.backgroundColor}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box middle>
          <NewPasswordIcon />
        </Box>

        <TextInputField
          leftLabel='Mật khẩu mới'
          // iconLeft={<LockIcon width={20} height={20} />}
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
          // iconLeft={<LockIcon width={20} height={20} />}
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
          onPress={handleSubmit(_createNewPassword)}
          h={44}
          color={theme.colors.primary}
          centered
          middle
          borderRadius={8}
          mv={32}
        >
          <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            Lưu mật khẩu
          </TextField>
        </Button>
      </ScrollView>
    </Box>
  );
};
