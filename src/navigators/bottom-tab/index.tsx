import { APP_SCREEN } from '@/navigators/screen-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigation } from './home-stack';
import { NotificationStackNavigation } from './notification-stack';
import { OrderStackNavigation } from './order-stack';
import { SettingStackNavigation } from './setting-stack';
import { TabBar } from './tab-bar';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name={APP_SCREEN.HOME_STACK} component={HomeStackNavigation} />
      <Tab.Screen name={APP_SCREEN.ORDER_STACK} component={OrderStackNavigation} />
      <Tab.Screen name={APP_SCREEN.NOTIFICATION_STACK} component={NotificationStackNavigation} />
      <Tab.Screen name={APP_SCREEN.SETTING_STACK} component={SettingStackNavigation} />
    </Tab.Navigator>
  );
};
