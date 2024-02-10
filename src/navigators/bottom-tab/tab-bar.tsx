import { useCallback } from 'react';

import { Box, Button, Spacer, TextField } from '@/components';
import { APP_SCREEN } from '@/navigators/screen-types';
import theme from '@/helpers/theme';
import {
  HomeActiveIcon,
  HomeInactiveIcon,
  OrderActive,
  OrderInactive,
  ProfileActive,
  ProfileInactive,
} from '@/assets/icons';
import { SIZE } from '@/helpers/size';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { TRootState, useAppDispatch } from '@/stores';
import { setShowDialog } from '@/stores/client';
import useAuth from '@/hooks/useAuth';

const titleBottom = (route: string) => {
  switch (route) {
    case APP_SCREEN.HOME_STACK:
      return 'Trang chủ';
    case APP_SCREEN.ORDER_STACK:
      return 'Đặt hoa theo ngày';
    case APP_SCREEN.NOTIFICATION_STACK:
      return 'Thông báo';
    case APP_SCREEN.SETTING_STACK:
      return 'Tài khoản';

    default:
      return 'Trang chủ';
  }
};

const IconActive = (route: any) => {
  switch (route.name) {
    case APP_SCREEN.HOME_STACK:
      return <HomeActiveIcon />;
    case APP_SCREEN.ORDER_STACK:
      return <OrderActive width={24} height={25} />;
    case APP_SCREEN.NOTIFICATION_STACK:
      return <HomeActiveIcon />;
    case APP_SCREEN.SETTING_STACK:
      return <ProfileActive />;

    default:
      return <HomeActiveIcon />;
  }
};

const IconInActive = (route: any) => {
  switch (route.name) {
    case APP_SCREEN.HOME_STACK:
      return <HomeInactiveIcon />;
    case APP_SCREEN.ORDER_STACK:
      return <OrderInactive width={24} height={25} />;
    case APP_SCREEN.NOTIFICATION_STACK:
      return <HomeInactiveIcon />;
    case APP_SCREEN.SETTING_STACK:
      return <ProfileInactive />;

    default:
      return <HomeInactiveIcon />;
  }
};

export const TabBar = (prop: any) => {
  const { state, navigation } = prop;
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const isAuth = useAuth();

  const onPress = useCallback(
    (routeKey: string, routeName: string, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
      });

      if (!isFocused && !event.defaultPrevented) {
        if (!isAuth) {
          dispatch(setShowDialog(true));
        } else {
          navigation.navigate(routeName);
        }
      }
    },
    [navigation, isAuth],
  );

  const onLongPress = useCallback(
    (routeKey: string) => {
      navigation.emit({
        type: 'tabLongPress',
        target: routeKey,
      });
    },
    [navigation],
  );

  return (
    <Box
      h={70}
      ph={16}
      direction='row'
      between
      borderRadius={16}
      color={theme.colors.primary}
      mh={10}
      mb={insets.bottom}
    >
      {state.routes.map((route: any, index: number) => {
        const label = titleBottom(route.name);
        const isFocused = state.index === index;
        return (
          <Button
            key={route.key}
            alignSelf='center'
            middle
            onPress={() => onPress(route.key, route.name, isFocused)}
            onLongPress={() => onLongPress(route.key)}
          >
            {isFocused ? <IconActive {...route} /> : <IconInActive {...route} />}
            <Spacer height={5} />
            <TextField
              size={11}
              fontFamily={isFocused ? theme.fonts.medium : theme.fonts.regular}
              color={theme.colors.lightSixColor}
            >
              {label}
            </TextField>
          </Button>
        );
      })}
    </Box>
  );
};
