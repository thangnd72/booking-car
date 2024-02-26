import {
  ArrowRightIcon,
  CameraIcon,
  ListIcon,
  LockIcon,
  LogoutIcon,
  SyncIcon,
  UserIcon,
  UserManageIcon,
} from '@/assets/icons';
import { EUserRole, randomUniqueId } from '@/common';
import { Box, Button, FastImg, TextField } from '@/components';
import { navigate, reset } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { showError } from '@/helpers/toast';
import ResponseError from '@/interfaces/error.interface';
import { APP_SCREEN } from '@/navigators/screen-types';
import { uploadPhotoApi } from '@/services/common.services';
import { TRootState, useAppDispatch } from '@/stores';
import { logout, updateProfileUserAction } from '@/stores/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { compact, uniqueId } from 'lodash';
import React, { useState } from 'react';
import { ActivityIndicator, Platform, ScrollView } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { LogoutDialog } from './components';
import styles from './styles';

const SettingScreen = React.memo(() => {
  const dispatch = useAppDispatch();
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { profile } = useSelector((state: TRootState) => state.client);

  const updateProfileImage = async (photo: ImageOrVideo) => {
    if (!profile) return;
    try {
      setLoading(true);
      const formData = new FormData();
      const avatar = {
        uri: Platform.OS === 'ios' ? photo.path?.replace('file://', '') : photo.path,
        name: photo.filename,
        type: photo.mime,
      };
      formData.append('file', avatar);
      const response = await uploadPhotoApi(formData);

      dispatch(
        updateProfileUserAction({
          ...profile,
          avatar: response.data,
          onSuccess: () => {
            setLoading(false);
          },
        }),
      );
    } catch (error) {
      setLoading(false);
      const { message } = error as ResponseError;
      showError(message);
    }
  };

  const chooseAvatar = async () => {
    try {
      const assets = await ImagePicker.openPicker({
        cropping: true,
      });
      const file = {
        ...assets,
        id: uniqueId(),
      };
      if (!file) {
        return;
      }
      updateProfileImage(file);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const onLogout = () => {
    setConfirmPopup(true);
  };

  const onDismiss = () => {
    setConfirmPopup(false);
  };

  const handleLogout = () => {
    onDismiss();
    dispatch(logout());
    AsyncStorage.clear();
    reset(APP_SCREEN.HOME);
    navigate(APP_SCREEN.HOME);
  };

  const _onManageUser = () => {
    navigate(APP_SCREEN.MANAGE_USER);
  };

  const _onNavigateCarts = () => {
    navigate(APP_SCREEN.SHOPPING_CART);
  };

  const _onNavigateChangePassword = () => {
    navigate(APP_SCREEN.CREATE_NEW_PASSWORD);
  };

  const _onNavigateSynchronized = () => {
    navigate(APP_SCREEN.SYNCHRONIZED);
  };

  const _onNavigateUserDetail = () => {
    navigate(APP_SCREEN.USER_DETAIL_SCREEN, { userId: profile?.id });
  };

  const _renderSettings = [
    profile?.roles[0].code === EUserRole.SUPER_ADMIN
      ? {
          key: randomUniqueId(),
          title: 'Quản lý người dùng',
          icon: <UserManageIcon />,
          action: _onManageUser,
        }
      : undefined,
    profile?.roles[0].code === EUserRole.SUPER_ADMIN
      ? {
          key: randomUniqueId(),
          title: 'Đồng bộ dữ liệu',
          icon: <SyncIcon />,
          action: _onNavigateSynchronized,
        }
      : undefined,
    {
      key: randomUniqueId(),
      title: 'Thông tin người dùng',
      icon: <UserIcon width={24} height={24} />,
      action: _onNavigateUserDetail,
    },
    {
      key: randomUniqueId(),
      title: 'Đơn hàng',
      icon: <ListIcon />,
      action: _onNavigateCarts,
    },
    // {
    //   key: randomUniqueId(),
    //   title: 'Địa chỉ của bạn',
    //   icon: <LocationIcon />,
    // },
    {
      key: randomUniqueId(),
      title: 'Đổi mật khẩu',
      icon: <LockIcon />,
      action: _onNavigateChangePassword,
    },
    {
      key: randomUniqueId(),
      title: 'Đăng xuất',
      icon: <LogoutIcon />,
      action: onLogout,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Box>
        <Box middle>
          {loading ? (
            <Box flex={1} w={100} h={100} middle centered>
              <ActivityIndicator color={theme.colors.primary} />
            </Box>
          ) : (
            <FastImg uri={profile?.avatarUrl || ''} pictureStyle={styles.profileImg} />
          )}
          <Button
            onPress={chooseAvatar}
            style={styles.cameraWrapper}
            color={theme.colors.lightSixColor}
            borderRadius={20}
            p={4}
          >
            <CameraIcon width={20} height={20} />
          </Button>
        </Box>
        <Box middle>
          <TextField
            fontFamily={theme.fonts.medium}
            color={theme.colors.textColor}
            size={20}
            pt={16}
          >
            {profile?.fullName}
          </TextField>
          <TextField mt={4} size={12} color={theme.colors.darkOneColor}>
            {`Vai trò: ${profile?.roles && profile.roles[0].name}`}
          </TextField>
          <TextField mt={4} size={12} color={theme.colors.darkSixColor}>
            {profile?.phoneNumber}
          </TextField>
        </Box>
      </Box>
      {/* <Statistical /> */}
      <Box gap={12} pt={24}>
        {compact(_renderSettings).map((entry) => (
          <Button
            pv={12}
            ph={12}
            direction='row'
            middle
            between
            key={entry.key}
            color={theme.colors.lightFourColor}
            borderRadius={8}
            onPress={() => {
              if (entry.action) {
                entry.action();
              }
            }}
          >
            <Box direction='row' middle gap={8}>
              {entry.icon}
              <TextField size={16} color={theme.colors.textColor}>
                {entry.title}
              </TextField>
            </Box>
            <ArrowRightIcon />
          </Button>
        ))}
      </Box>

      <LogoutDialog isOpen={confirmPopup} onDismiss={onDismiss} onLogout={handleLogout} />
    </ScrollView>
  );
});
export default SettingScreen;
