import { useCallback } from 'react';

import { Box, Button, Spacer, TextField } from '@/components';
import { APP_SCREEN } from '@/navigators/screen-types';
import theme from '@/helpers/theme';
import {
  FlowerActiveIcon,
  FlowerInactiveIcon,
  HomeActiveIcon,
  HomeInactiveIcon,
  OrderActive,
  OrderInactive,
  ProfileActive,
  ProfileInactive,
  WareHouseActiveIcon,
  WareHouseInactiveIcon,
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
    case APP_SCREEN.PLAN_STACK:
      return 'Dự trù';
    case APP_SCREEN.SETTING_STACK:
      return 'Tài khoản';

    default:
      return 'Trang chủ';
  }
};

const IconActive = (route: any) => {
  switch (route.name) {
    case APP_SCREEN.HOME_STACK:
      return <HomeActiveIcon width={24} height={24} />;
    case APP_SCREEN.ORDER_STACK:
      return <FlowerActiveIcon width={24} height={24} />;
    case APP_SCREEN.PLAN_STACK:
      return <WareHouseActiveIcon width={24} height={24} />;
    case APP_SCREEN.SETTING_STACK:
      return <ProfileActive />;

    default:
      return <HomeActiveIcon width={24} height={24} />;
  }
};

const IconInActive = (route: any) => {
  switch (route.name) {
    case APP_SCREEN.HOME_STACK:
      return <HomeInactiveIcon width={24} height={24} />;
    case APP_SCREEN.ORDER_STACK:
      return <FlowerInactiveIcon width={24} height={24} />;
    case APP_SCREEN.PLAN_STACK:
      return <WareHouseInactiveIcon width={24} height={24} />;
    case APP_SCREEN.SETTING_STACK:
      return <ProfileInactive />;

    default:
      return <HomeInactiveIcon width={24} height={24} />;
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
              size={12}
              color={isFocused ? theme.colors.white : theme.colors.lightSixColor}
            >
              {label}
            </TextField>
          </Button>
        );
      })}
    </Box>
  );
};
