import { useCallback } from 'react';

import {
  ProfileActive,
  ProfileInactive,
  ReportActiveIcon,
  ReportInactiveIcon,
  RouteActiveIcon,
  RouteInactiveIcon,
  TimeActiveIcon,
  TimeInactiveIcon,
  TruckActiveIcon,
  TruckInactiveIcon,
} from '@/assets/icons';
import { Box, Button, Spacer, TextField } from '@/components';
import theme from '@/helpers/theme';
import useAuth from '@/hooks/useAuth';
import { APP_SCREEN } from '@/navigators/screen-types';
import { useAppDispatch } from '@/stores';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const titleBottom = (route: string) => {
  switch (route) {
    case APP_SCREEN.TRUCK_STACK:
      return 'Đầu xe';
    case APP_SCREEN.ROUTE_STACK:
      return 'Lộ trình';
    case APP_SCREEN.TIME_STACK:
      return 'Thời gian';
    case APP_SCREEN.REPORT_STACK:
      return 'Báo cáo';
    case APP_SCREEN.SETTING_STACK:
      return 'Cá nhân';

    default:
      return 'Đầu xe';
  }
};

const IconActive = (route: any) => {
  switch (route.name) {
    case APP_SCREEN.TRUCK_STACK:
      return <TruckActiveIcon />;
    case APP_SCREEN.ROUTE_STACK:
      return <RouteActiveIcon />;
    case APP_SCREEN.TIME_STACK:
      return <TimeActiveIcon />;
    case APP_SCREEN.REPORT_STACK:
      return <ReportActiveIcon />;
    case APP_SCREEN.SETTING_STACK:
      return <ProfileActive />;

    default:
      return <TruckActiveIcon />;
  }
};

const IconInActive = (route: any) => {
  switch (route.name) {
    case APP_SCREEN.TRUCK_STACK:
      return <TruckInactiveIcon />;
    case APP_SCREEN.ROUTE_STACK:
      return <RouteInactiveIcon />;
    case APP_SCREEN.TIME_STACK:
      return <TimeInactiveIcon />;
    case APP_SCREEN.REPORT_STACK:
      return <ReportInactiveIcon />;
    case APP_SCREEN.SETTING_STACK:
      return <ProfileInactive />;

    default:
      return <TruckInactiveIcon />;
  }
};

export const TabBar = (prop: any) => {
  const { state, navigation } = prop;
  const insets = useSafeAreaInsets();

  const onPress = useCallback(
    (routeKey: string, routeName: string, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName);
      }
    },
    [navigation],
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
