import { LogoApp, MessageIcon, NotificationIcon } from '@/assets/icons';
import { Box, Button, TextField } from '@/components';
import theme from '@/helpers/theme';
import { TRootState, useAppDispatch } from '@/stores';
import { setShowDialog } from '@/stores/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useSelector((state: TRootState) => state.client);

  const _onPressOrder = () => {
    if (!accessToken) {
      dispatch(setShowDialog(true));
    }
  };

  return (
    <Box direction='row' between middle>
      <LogoApp width={80} height={80} />
      <Box direction='row' gap={12}>
        <Button
          onPress={_onPressOrder}
          color={theme.colors.lightThreeColor}
          centered
          middle
          borderRadius={21}
          w={42}
          h={42}
        >
          <MessageIcon />
        </Button>
        <Button
          onPress={_onPressOrder}
          color={theme.colors.lightThreeColor}
          centered
          middle
          borderRadius={21}
          w={42}
          h={42}
        >
          <NotificationIcon />
        </Button>
      </Box>
    </Box>
  );
};
