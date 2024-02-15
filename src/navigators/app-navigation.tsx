import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import RootNavigator from './root-navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { LoadingScreen, ToastError, ToastSuccess } from '@/components';
import { navigationRef } from '@/helpers/GlobalNavigation';
import { PortalHost } from '@gorhom/portal';
import { AuthPopup } from '@/shared/AuthPopup';

export const AppContainer = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // background: theme.colors.backgroundColor,
    },
  };

  const toastConfig: any = {
    successMessage: ({ props }: { props: { message: string } }) => (
      <ToastSuccess message={props.message} />
    ),
    errorMessage: ({ props }: { props: { message: string } }) => (
      <ToastError message={props.message} />
    ),
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={navTheme}>
        <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
        <RootNavigator />
        <PortalHost name={'AppModal'} />
      </NavigationContainer>
      <Toast config={toastConfig} position='top' />
      <AuthPopup />
      <LoadingScreen />
    </SafeAreaProvider>
  );
};
