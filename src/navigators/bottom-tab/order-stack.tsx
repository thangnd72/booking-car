import { APP_SCREEN, TRootStackParamList } from '@/navigators/screen-types';
import SignIn from '@/screens/Auth/SignIn';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<TRootStackParamList>();

export const OrderStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
    >
      <Stack.Group
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name={APP_SCREEN.ORDER}
          component={SignIn}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
