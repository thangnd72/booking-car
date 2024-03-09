import SignIn from '@/screens/Auth/SignInScreen';
import { SignUpScreen } from '@/screens/Auth/SignUpScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { BottomTab } from './bottom-tab';
import { APP_SCREEN, TRootStackParamList } from './screen-types';
import { headerOptions } from './config-header';
import { ForgotPasswordScreen } from '@/screens/Auth/ForgotPassword';
import { VerifyOTPScreen } from '@/screens/Auth/VerifyOTP';
import { CreateNewPasswordScreen } from '@/screens/Auth/CreateNewPassword';
import useAuth from '@/hooks/useAuth';

const RootStack = createStackNavigator<TRootStackParamList>();

const RootNavigator = React.memo(() => {
  const isAuth = useAuth();
  React.useEffect(() => {
    const splash = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);
    return () => clearTimeout(splash);
  }, []);

  return (
    <>
      {!isAuth ? (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Group
            screenOptions={{
              animationTypeForReplace: 'pop',
            }}
          >
            <RootStack.Screen name={APP_SCREEN.LOGIN} component={SignIn} />
            <RootStack.Screen
              name={APP_SCREEN.SIGN_UP}
              component={SignUpScreen}
              options={{ ...headerOptions, title: 'Thông tin đăng ký' }}
            />
            <RootStack.Screen
              name={APP_SCREEN.FORGOT_PASSWORD}
              component={ForgotPasswordScreen}
              options={{ ...headerOptions, title: 'Quên mật khẩu' }}
            />
            <RootStack.Screen
              name={APP_SCREEN.VERIFICATION_OTP}
              component={VerifyOTPScreen}
              options={{ ...headerOptions, title: 'Xác thực OTP' }}
            />
            <RootStack.Screen
              name={APP_SCREEN.CREATE_NEW_PASSWORD}
              component={CreateNewPasswordScreen}
              options={{ ...headerOptions, title: 'Tạo mật khẩu mới' }}
            />
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
