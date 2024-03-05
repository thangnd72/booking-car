import { APP_SCREEN, TRootStackParamList } from '@/navigators/screen-types';
import TruckScreen from '@/screens/TruckScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<TRootStackParamList>();

export const TimeStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name={APP_SCREEN.HOME}
          component={TruckScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
