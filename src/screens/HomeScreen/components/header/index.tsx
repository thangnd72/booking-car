import { LogoApp, MessageIcon, NotificationIcon } from '@/assets/icons';
import { Box, Button } from '@/components';
import theme from '@/helpers/theme';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/stores';
import { setShowDialog } from '@/stores/client';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAuth();

  const _onPressOrder = () => {
    if (!isAuth) {
      dispatch(setShowDialog(true));
    }
  };

  return (
    <Box direction='row' between middle>
      <LogoApp width={80} height={80} />
      <Box direction='row' gap={12}>
        <Button
          onPress={_onPressOrder}
          color={theme.colors.lightFourColor}
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
          color={theme.colors.lightFourColor}
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
