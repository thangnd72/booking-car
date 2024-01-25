import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { headerOptions } from './config-header';
import { APP_SCREEN, TRootStackParamList } from './screen-types';
import SignIn from '@/screens/Auth/SignInScreen';
import { BottomTab } from './bottom-tab';
import BootSplash from 'react-native-bootsplash';

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
      {false ? (
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
