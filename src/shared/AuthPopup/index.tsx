import { Box, Button, Modal, TextField } from '@/components';
import { navigate } from '@/helpers/GlobalNavigation';
import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { APP_SCREEN } from '@/navigators/screen-types';
import { TRootState, useAppDispatch } from '@/stores';
import { setShowDialog } from '@/stores/client';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

export const AuthPopup: React.FC = () => {
  const dispatch = useAppDispatch();

  const { showDialog } = useSelector((state: TRootState) => state.client);

  const handleCloseModal = () => {
    dispatch(setShowDialog(false));
  };

  const handleLogin = () => {
    handleCloseModal();
    navigate(APP_SCREEN.LOGIN);
  };

  return (
    <Modal
      isVisible={showDialog}
      onBackdropPress={handleCloseModal}
      entering={FadeIn.duration(100)}
      exiting={FadeOut.duration(100)}
    >
      <Box borderRadius={16} color={theme.colors.backgroundColor} pv={24} mh={16} ph={24} centered>
        <TextField
          centered
          fontFamily={theme.fonts.medium}
          size={SIZE.fontPixel(24)}
          color={theme.colors.primary}
        >
          Thông báo
        </TextField>
        <TextField centered pv={16} size={SIZE.fontPixel(16)} color={theme.colors.textColor}>
          Vui lòng đăng nhập để thực hiện chức năng này!
        </TextField>
        <Box direction='row' middle style={{ gap: 16 }}>
          <Button
            flex={1}
            middle
            color={theme.colors.lightOneColor}
            pv={10}
            borderRadius={8}
            onPress={handleCloseModal}
            centered
          >
            <TextField fontFamily={theme.fonts.medium} color={theme.colors.textColor}>
              Huỷ
            </TextField>
          </Button>
          <Button
            flex={1}
            middle
            color={theme.colors.primary}
            pv={10}
            borderRadius={8}
            onPress={handleLogin}
          >
            <TextField color={theme.colors.backgroundColor} fontFamily={theme.fonts.medium}>
              Đăng nhập
            </TextField>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
