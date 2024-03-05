import SignIn from '@/screens/Auth/SignInScreen';
import { SignUpScreen } from '@/screens/Auth/SignUpScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { BottomTab } from './bottom-tab';
import { APP_SCREEN, TRootStackParamList } from './screen-types';
import { headerOptions } from './config-header';

const RootStack = createStackNavigator<TRootStackParamList>();

const RootNavigator = React.memo(() => {
  React.useEffect(() => {
    const splash = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);
    return () => clearTimeout(splash);
  }, []);

  return (
    <>
      {true ? (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Group
            screenOptions={{
              animationTypeForReplace: 'pop',
            }}
          >
            <RootStack.Screen name={APP_SCREEN.LOGIN} component={SignIn} />
            {/* <RootStack.Screen name={APP_SCREEN.SIGN_UP} component={<></>} /> */}
          </RootStack.Group>
        </RootStack.Navigator>
      ) : (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name={APP_SCREEN.BOTTOM_TAB} component={BottomTab} />
          <RootStack.Screen name={APP_SCREEN.HOME} component={SignIn} options={headerOptions} />
        </RootStack.Navigator>
      )}
    </>
  );
});

RootNavigator.displayName = 'RootNavigator';
export default RootNavigator;
