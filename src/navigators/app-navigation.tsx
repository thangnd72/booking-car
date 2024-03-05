import { LoadingScreen, ToastError, ToastSuccess } from '@/components';
import { navigationRef } from '@/helpers/GlobalNavigation';
import { PortalHost } from '@gorhom/portal';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import RootNavigator from './root-navigator';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import theme from '@/helpers/theme';

export const AppContainer = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.backgroundColor,
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
    <AutocompleteDropdownContextProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef} theme={navTheme}>
          <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
          <RootNavigator />
          <PortalHost name={'AppModal'} />
        </NavigationContainer>
        <Toast config={toastConfig} position='top' />
        <LoadingScreen />
      </SafeAreaProvider>
    </AutocompleteDropdownContextProvider>
  );
};
