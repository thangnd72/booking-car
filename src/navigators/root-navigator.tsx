import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { headerOptions } from './config-header';
import { APP_SCREEN, TRootStackParamList } from './screen-types';
import SignIn from '@/screens/Auth/SignInScreen';
import { BottomTab } from './bottom-tab';
import BootSplash from 'react-native-bootsplash';
import HomeScreen from '@/screens/HomeScreen';
import { useSelector } from 'react-redux';
import { TRootState } from '@/stores';
import { SignUpScreen } from '@/screens/Auth/SignUpScreen';

const RootStack = createStackNavigator<TRootStackParamList>();

const RootNavigator = React.memo(() => {
  const { accessToken } = useSelector((state: TRootState) => state.client);

  React.useEffect(() => {
    const splash = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);
    return () => clearTimeout(splash);
  }, []);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={APP_SCREEN.BOTTOM_TAB} component={BottomTab} />
      <RootStack.Screen name={APP_SCREEN.SIGN_UP} component={SignUpScreen} />
      <RootStack.Group
        screenOptions={{
          presentation: 'modal',
        }}
      >
        <RootStack.Screen name={APP_SCREEN.LOGIN} component={SignIn} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
});

RootNavigator.displayName = 'RootNavigator';
export default RootNavigator;
