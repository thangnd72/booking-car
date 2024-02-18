import { APP_SCREEN, TRootStackParamList } from '@/navigators/screen-types';
import ManageUser from '@/screens/ManageUser';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<TRootStackParamList>();

export const PlanStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name={APP_SCREEN.MANAGE_USER}
          component={ManageUser}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
