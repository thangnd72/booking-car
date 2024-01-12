import { useCallback } from 'react';

import { Box, Button, Spacer, TextField } from '@/components';
import { APP_SCREEN } from '@/navigators/screen-types';
import theme from '@/helpers/theme';
import { HomeActiveIcon, HomeInactiveIcon } from '@/assets/icons';

const titleBottom = (route: string) => {
  switch (route) {
    case APP_SCREEN.HOME_STACK:
      return 'Trang chủ';
    case APP_SCREEN.ORDER_STACK:
      return 'Điện hoa';
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
      return <HomeActiveIcon />;
    case APP_SCREEN.NOTIFICATION_STACK:
      return <HomeActiveIcon />;
    case APP_SCREEN.SETTING_STACK:
      return <HomeActiveIcon />;

    default:
      return <HomeActiveIcon />;
  }
};

const IconInActive = (route: any) => {
  switch (route.name) {
    case APP_SCREEN.HOME_STACK:
      return <HomeInactiveIcon />;
    case APP_SCREEN.ORDER_STACK:
      return <HomeInactiveIcon />;
    case APP_SCREEN.NOTIFICATION_STACK:
      return <HomeInactiveIcon />;
    case APP_SCREEN.SETTING_STACK:
      return <HomeInactiveIcon />;

    default:
      return <HomeInactiveIcon />;
  }
};

export const TabBar = (prop: any) => {
  const { state, navigation } = prop;

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
      h={85}
      pb={10}
      ph={16}
      direction='row'
      between
      borderTopColor='#ECECEC'
      borderTopWidth={0.5}
    >
      {state.routes.map((route: any, index: number) => {
        const label = titleBottom(route.name);
        const isFocused = state.index === index;
        return (
          <Button
            key={route.key}
            // flex={1}
            alignSelf='center'
            middle
            onPress={() => onPress(route.key, route.name, isFocused)}
            onLongPress={() => onLongPress(route.key)}
          >
            {isFocused ? <IconActive {...route} /> : <IconInActive {...route} />}
            <Spacer height={5} />
            <TextField
              size={11}
              fontFamily={isFocused ? 'bold' : 'regular'}
              color={isFocused ? theme.colors.primary : theme.colors.greenTwoColor}
            >
              {label}
            </TextField>
          </Button>
        );
      })}
    </Box>
  );
};
