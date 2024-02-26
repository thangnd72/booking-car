import { ArrowLeftIcon, PhoneIcon, UserIcon } from '@/assets/icons';
import { EUserRole, validationError, validationSchema } from '@/common';
import { Box, Button, FastImg, Spacer, TextField, TextInputField } from '@/components';
import { goBack } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { showError, showSuccess } from '@/helpers/toast';
import { IChangeUserParams, IUser } from '@/interfaces/auth.interfaces';
import ResponseError from '@/interfaces/error.interface';
import { getCurrentUserProfileApi, getProfileUserApi } from '@/services/user.services';
import { TRootState, useAppDispatch } from '@/stores';
import { updateCustomerProfileAction, updateProfileUserAction } from '@/stores/client';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { useSelector } from 'react-redux';

interface IParams {
  userId: string;
}

const UserDetailScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { params } = useRoute();
  const { userId } = (params as IParams) ?? [];
  const [userInfo, setUserInfo] = useState<IUser>();

  const { profile } = useSelector((state: TRootState) => state.client);

  const { control, setValue, handleSubmit } = useForm<IUser>({
    defaultValues: {
      phoneNumber: '',
      fullName: '',
    },
  });

  const getUserProfile = useCallback(async () => {
    try {
      const res = await getProfileUserApi(userId);
      setUserInfo(res.data);
      setValue('phoneNumber', res.data.phoneNumber);
      setValue('fullName', res.data.fullName);
    } catch (error) {
      const { message } = error as ResponseError;
      showError(message);
    }
  }, [userId]);

  const getCurrentUserProfile = useCallback(async () => {
    try {
      const res = await getCurrentUserProfileApi();
      setUserInfo(res.data);
      setValue('phoneNumber', res.data.phoneNumber);
      setValue('fullName', res.data.fullName);
    } catch (error) {
      const { message } = error as ResponseError;
      showError(message);
    }
  }, [userId]);

  const _updateUser = (values: IChangeUserParams) => {
    if (!userInfo) return;

    if (profile?.roles && profile.roles[0].code === EUserRole.SUPER_ADMIN) {
      dispatch(
        updateProfileUserAction({
          ...userInfo,
          phoneNumber: values.phoneNumber,
          fullName: values.fullName,
          onSuccess: () => {
            showSuccess('Cập nhật thành công!');
          },
          onError: (err) => {
            showError(err.message);
          },
        }),
      );
    } else {
      dispatch(
        updateCustomerProfileAction({
          ...userInfo,
          phoneNumber: values.phoneNumber,
          fullName: values.fullName,
          onSuccess: () => {
            showSuccess('Cập nhật thành công!');
          },
          onError: (err) => {
            showError(err.message);
          },
        }),
      );
    }
  };

  useEffect(() => {
    if (profile?.roles && profile.roles[0].code === EUserRole.SUPER_ADMIN) {
      getUserProfile();
    } else {
      getCurrentUserProfile();
    }
  }, [profile?.roles]);

  return (
    <Box flex={1} ph={24} pt={insets.top} color={theme.colors.backgroundColor}>
      <Box direction='row' middle gap={8} between>
        <Button onPress={goBack}>
          <ArrowLeftIcon />
        </Button>
        <TextField size={20} fontFamily={theme.fonts.medium} color={theme.colors.textColor}>
          Thông tin người dùng
        </TextField>
        <Box w={24} />
      </Box>

      <Box middle pv={24}>
        <FastImg uri={userInfo?.avatarUrl ?? ''} pictureStyle={styles.profileImg} />
        <TextField mt={16} size={12} color={theme.colors.darkOneColor}>
          {`Vai trò: ${userInfo?.roles && userInfo.roles[0].name}`}
        </TextField>
      </Box>

      <Box mt={24}>
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
        <Spacer height={8} />

        <Button
          onPress={handleSubmit(_updateUser)}
          h={52}
          color={theme.colors.primary}
          centered
          middle
          borderRadius={8}
          mv={32}
        >
          <TextField size={16} color={theme.colors.white} fontFamily={theme.fonts.medium}>
            Cập nhật
          </TextField>
        </Button>
      </Box>
    </Box>
  );
};
export default UserDetailScreen;
