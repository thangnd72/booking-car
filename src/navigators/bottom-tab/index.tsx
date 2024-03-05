import { APP_SCREEN } from '@/navigators/screen-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TruckStackNavigation } from './truck-stack';
import { SettingStackNavigation } from './setting-stack';
import { TabBar } from './tab-bar';
import { useSelector } from 'react-redux';
import { TRootState } from '@/stores';
import { EUserRole } from '@/common';
import { ReportStackNavigation } from './report-stack';
import { TimeStackNavigation } from './time-stack';
import { RouteStackNavigation } from './route-stack';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  const { profile } = useSelector((state: TRootState) => state.client);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name={APP_SCREEN.TRUCK_STACK} component={TruckStackNavigation} />
      <Tab.Screen name={APP_SCREEN.ROUTE_STACK} component={RouteStackNavigation} />
      <Tab.Screen name={APP_SCREEN.TIME_STACK} component={TimeStackNavigation} />
      <Tab.Screen name={APP_SCREEN.REPORT_STACK} component={ReportStackNavigation} />
      <Tab.Screen name={APP_SCREEN.SETTING_STACK} component={SettingStackNavigation} />
    </Tab.Navigator>
  );
};
