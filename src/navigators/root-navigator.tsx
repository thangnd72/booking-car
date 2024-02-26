import SignIn from '@/screens/Auth/SignInScreen';
import { SignUpScreen } from '@/screens/Auth/SignUpScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { BottomTab } from './bottom-tab';
import { APP_SCREEN, TRootStackParamList } from './screen-types';
import ProductByCategory from '@/screens/ProductByCategory';
import ManageUser from '@/screens/ManageUser';
import ProductDetails from '@/screens/ProductDetail';
import ShoppingCart from '@/screens/ShoppingCart';
import CheckoutScreen from '@/screens/CheckoutScreen';
import ChangePasswordScreen from '@/screens/Auth/ChangePassword';
import UserDetailScreen from '@/screens/UserDetails';
import SynchronizedScreen from '@/screens/SynchronizedScreen';

const RootStack = createStackNavigator<TRootStackParamList>();

const RootNavigator = React.memo(() => {
  React.useEffect(() => {
    const splash = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);
    return () => clearTimeout(splash);
  }, []);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={APP_SCREEN.BOTTOM_TAB} component={BottomTab} />
      <RootStack.Group
        screenOptions={{
          presentation: 'modal',
        }}
      >
        <RootStack.Screen name={APP_SCREEN.LOGIN} component={SignIn} />
        <RootStack.Screen name={APP_SCREEN.SIGN_UP} component={SignUpScreen} />
      </RootStack.Group>
      <RootStack.Screen
        name={APP_SCREEN.PRODUCT_BY_CATEGORY}
        component={ProductByCategory}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={APP_SCREEN.MANAGE_USER}
        component={ManageUser}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={APP_SCREEN.PRODUCT_DETAIL}
        component={ProductDetails}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={APP_SCREEN.SHOPPING_CART}
        component={ShoppingCart}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={APP_SCREEN.CHECKOUT_SCREEN}
        component={CheckoutScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={APP_SCREEN.CREATE_NEW_PASSWORD}
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={APP_SCREEN.USER_DETAIL_SCREEN}
        component={UserDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name={APP_SCREEN.SYNCHRONIZED}
        component={SynchronizedScreen}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
});

RootNavigator.displayName = 'RootNavigator';
export default RootNavigator;
