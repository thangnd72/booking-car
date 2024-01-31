import { APP_SCREEN, TRootStackParamList } from '@/navigators/screen-types';
import SignIn from '@/screens/Auth/SignInScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { headerOptions } from '@/navigators/config-header';
import HomeScreen from '@/screens/HomeScreen';

const Stack = createStackNavigator<TRootStackParamList>();

export const SettingStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name={APP_SCREEN.PROFILE} component={HomeScreen} options={headerOptions} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
