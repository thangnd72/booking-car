import { ForgotPasswordIcon } from '@/assets/icons';
import { validationError, validationSchema } from '@/common';
import { Box, Button, TextField, TextInputField } from '@/components';
import { goBack, navigate } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { showSuccess } from '@/helpers/toast';
import { IForgotPwParams } from '@/interfaces/auth.interfaces';
import { APP_SCREEN } from '@/navigators/screen-types';
import { useAppDispatch } from '@/stores';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

export const ForgotPasswordScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, watch } = useForm<IForgotPwParams>({
    defaultValues: {
      email: '',
    },
  });

  const _onSuccess = () => {
    showSuccess('Đăng ký tài khoản thành công!');
    goBack();
  };

  const _verifyEmail = (values: IForgotPwParams) => {
    // dispatch(
    //   signUpAction({
    //     ...values,
    //     onSuccess: () => _onSuccess(),
    //     onError: (err) => {
    //       console.log('err', err);
    //       showError(err.message);
    //     },
    //   }),
    // );

    navigate(APP_SCREEN.VERIFICATION_OTP);
  };

  return (
    <Box p={16} flex={1} color={theme.colors.backgroundColor}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box middle>
          <ForgotPasswordIcon />
        </Box>

        <TextField color={theme.colors.darkTwoColor} size={14} mb={24} lineHeight={20}>
          Nhập email của bạn đang sử dụng để đăng nhập tài khoản. Chúng tôi sẻ gửi một mã OTP đến
          email của bạn
        </TextField>
        <TextInputField
          autoFocus
          leftLabel='Email'
          autoCapitalize='none'
          control={control}
          name='email'
          // required
          // rules={{
          //   required: 'Vui lòng nhập email!',
          //   pattern: {
          //     value: validationSchema.email,
          //     message: validationError.email,
          //   },
          // }}
        />
        <Button
          onPress={handleSubmit(_verifyEmail)}
          h={44}
          color={theme.colors.primary}
          centered
          middle
          borderRadius={8}
          mv={32}
        >
          <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            Gửi
          </TextField>
        </Button>
      </ScrollView>
    </Box>
  );
};
