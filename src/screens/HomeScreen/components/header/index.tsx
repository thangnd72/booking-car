import { LogoApp, MessageIcon, NotificationIcon, ShoppingCartIcon } from '@/assets/icons';
import { EUserRole } from '@/common';
import { Box, Button } from '@/components';
import { navigate } from '@/helpers/GlobalNavigation';
import theme from '@/helpers/theme';
import useAuth from '@/hooks/useAuth';
import { APP_SCREEN } from '@/navigators/screen-types';
import { TRootState, useAppDispatch } from '@/stores';
import { setShowDialog } from '@/stores/client';
import { useSelector } from 'react-redux';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAuth();
  const { profile } = useSelector((state: TRootState) => state.client);

  const _onPressMessage = () => {
    if (!isAuth) {
      dispatch(setShowDialog(true));
      return;
    }
    if (profile?.roles && profile.roles[0].code === EUserRole.SUPER_ADMIN) {
      navigate(APP_SCREEN.CONVERSATION_SCREEN);
    }
  };

  const _onPressCart = () => {
    if (!isAuth) {
      dispatch(setShowDialog(true));
      return;
    }
    navigate(APP_SCREEN.SHOPPING_CART);
  };

  return (
    <Box direction='row' between middle>
      <LogoApp width={80} height={80} />
      <Box direction='row' gap={12}>
        <Button
          onPress={_onPressMessage}
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
          onPress={_onPressCart}
          color={theme.colors.lightFourColor}
          centered
          middle
          borderRadius={21}
          w={42}
          h={42}
        >
          <ShoppingCartIcon width={24} height={24} />
        </Button>
      </Box>
    </Box>
  );
};
