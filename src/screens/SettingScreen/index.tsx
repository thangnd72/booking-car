import {
  ArrowRightIcon,
  CameraIcon,
  GiftIcon,
  ListIcon,
  LocationIcon,
  LockIcon,
  LogoutIcon,
  PresentIcon,
  ReportIcon,
  ThemeIcon,
} from '@/assets/icons';
import { randomUniqueId } from '@/common';
import { Box, Button, FastImg, TextField } from '@/components';
import { navigate, reset } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import { APP_SCREEN } from '@/navigators/screen-types';
import { useAppDispatch } from '@/stores';
import { logout } from '@/stores/client';
import { uniqueId } from 'lodash';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { LogoutDialog, Statistical } from './components';
import styles from './styles';

const SettingScreen = React.memo(() => {
  const dispatch = useAppDispatch();
  const [userAvatar, setUserAvatar] = useState<ImageOrVideo>();
  const [confirmPopup, setConfirmPopup] = useState<boolean>(false);

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

  const _renderSettings = [
    {
      key: randomUniqueId(),
      title: 'Đơn hàng',
      icon: <ListIcon />,
    },
    {
      key: randomUniqueId(),
      title: 'Chủ đề quan tâm',
      icon: <ThemeIcon />,
    },
    {
      key: randomUniqueId(),
      title: 'Địa chỉ của bạn',
      icon: <LocationIcon />,
    },
    {
      key: randomUniqueId(),
      title: 'Danh sách quà tặng',
      icon: <GiftIcon />,
    },
    {
      key: randomUniqueId(),
      title: 'Quà tặng của bạn',
      icon: <GiftIcon />,
    },
    {
      key: randomUniqueId(),
      title: 'Thống kê mua hàng',
      icon: <ReportIcon />,
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
            uri={userAvatar?.path ?? 'https://ik.imagekit.io/tvlk/blog/2021/09/du-lich-anh-2.jpg'}
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
            Nguyễn Đình Thắng
          </TextField>
          <TextField mt={4} size={12} color={theme.colors.darkOneColor}>
            0975346755
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
