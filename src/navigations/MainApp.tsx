import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import _ from 'lodash';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { Buttons, Icon } from '../components';
import { MAIN_TAB, TAB_HIDEABLE } from '../constants/screens';
import useWatchPosition from '../hooks/useWatchPosition';
import { Content } from '../screens';
import ChatStack from './ChatStack';

const Tab = createBottomTabNavigator<HourChat.Navigation.MainTab>();

const Empty = () => null;

const MainApp = () => {
  useWatchPosition();

  return (
    <Tab.Navigator
      initialRouteName={MAIN_TAB.CHAT}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: scale(10),
          left: scale(20),
          right: scale(20),
          borderRadius: scale(20),
          height: scale(45),
        },
        tabBarButton: Buttons.TabBarButton,
      }}
    >
      <Tab.Screen
        name={MAIN_TAB.CHAT}
        component={ChatStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          const isHideable = _.includes(TAB_HIDEABLE, routeName);

          return {
            tabBarIcon: Icon.Main.Chat,
            tabBarLabel: 'Chat',
            ...(isHideable && {
              tabBarStyle: {
                display: 'none',
              },
            }),
          };
        }}
      />
      <Tab.Screen
        name={MAIN_TAB.NEAR_ME}
        component={Content.NearMe}
        options={{
          tabBarIcon: Icon.Main.NearMe,
          tabBarLabel: 'Near Me',
        }}
      />
      <Tab.Screen
        name={MAIN_TAB.PROFILE}
        component={Empty}
        options={{
          tabBarIcon: Icon.Main.Profile,
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainApp;
