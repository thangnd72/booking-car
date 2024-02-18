import {
  ArrowRightIcon,
  CameraIcon,
  GiftIcon,
  ListIcon,
  LocationIcon,
  LockIcon,
  LogoutIcon,
  ReportIcon,
  ThemeIcon,
  UserManageIcon,
} from '@/assets/icons';
import { randomUniqueId } from '@/common';
import { Box, Button, FastImg, TextField } from '@/components';
import { navigate, reset } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { APP_SCREEN } from '@/navigators/screen-types';
import { TRootState, useAppDispatch } from '@/stores';
import { logout } from '@/stores/client';
import { uniqueId } from 'lodash';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { LogoutDialog, Statistical } from './components';
import styles from './styles';

const SettingScreen = React.memo(() => {
  const dispatch = useAppDispatch();
  const [userAvatar, setUserAvatar] = useState<ImageOrVideo>();
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);

  const { profile } = useSelector((state: TRootState) => state.client);

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
      setUserAvatar(file);
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
    reset(APP_SCREEN.HOME);
    navigate(APP_SCREEN.HOME);
  };

  const _onManageUser = () => {
    navigate(APP_SCREEN.MANAGE_USER);
  };

  const _renderSettings = [
    {
      key: randomUniqueId(),
      title: 'Đơn hàng',
      icon: <ListIcon />,
    },
    {
      key: randomUniqueId(),
      title: 'Địa chỉ của bạn',
      icon: <LocationIcon />,
    },
    {
      key: randomUniqueId(),
      title: 'Quản lý người dùng',
      icon: <UserManageIcon />,
      action: _onManageUser,
    },
    {
      key: randomUniqueId(),
      title: 'Đổi mật khẩu',
      icon: <LockIcon />,
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
          <FastImg
            uri={userAvatar?.path || profile?.avatarUrl || ''}
            pictureStyle={styles.profileImg}
          />
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
            size={18}
            pt={16}
          >
            {profile?.fullName}
          </TextField>
          <TextField mt={4} size={12} color={theme.colors.darkOneColor}>
            {profile?.phoneNumber}
          </TextField>
          <TextField mt={4} size={12} color={theme.colors.darkOneColor}>
            {profile?.roles && profile.roles[0].name}
          </TextField>
        </Box>
      </Box>
      <Statistical />
      {_renderSettings.map((entry) => (
        <Button
          pv={12}
          direction='row'
          middle
          between
          key={entry.key}
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
      <LogoutDialog isOpen={confirmPopup} onDismiss={onDismiss} onLogout={handleLogout} />
    </ScrollView>
  );
});
export default SettingScreen;
