import { headerOptions } from '@/navigators/config-header';
import { APP_SCREEN, TRootStackParamList } from '@/navigators/screen-types';
import SettingScreen from '@/screens/SettingScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<TRootStackParamList>();

export const SettingStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          header: () => null,
        }}
      >
        <Stack.Screen name={APP_SCREEN.SETTING} component={SettingScreen} options={headerOptions} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
