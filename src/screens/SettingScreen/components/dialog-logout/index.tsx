import { Box, Button, Modal, TextField } from '@/components';
import { SIZE } from '@/helpers/size';
import theme from '@/helpers/theme';
import { FadeIn, FadeOut } from 'react-native-reanimated';

interface IProps {
  isOpen: boolean;
  onDismiss: () => void;
  onLogout: () => void;
}

export const LogoutDialog: React.FC<IProps> = ({ isOpen, onDismiss, onLogout }) => {
  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={onDismiss}
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
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
          Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng không?
        </TextField>
        <Box direction='row' middle style={{ gap: 16 }}>
          <Button
            flex={1}
            middle
            color={theme.colors.lightOneColor}
            pv={10}
            borderRadius={8}
            onPress={onDismiss}
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
            onPress={onLogout}
          >
            <TextField color={theme.colors.backgroundColor} fontFamily={theme.fonts.medium}>
              Đăng xuất
            </TextField>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
