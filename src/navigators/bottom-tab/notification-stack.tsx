import { APP_SCREEN, TRootStackParamList } from '@/navigators/screen-types';
import SignIn from '@/screens/Auth/SignIn';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<TRootStackParamList>();

export const NotificationStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name={APP_SCREEN.NOTIFICATION}
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
