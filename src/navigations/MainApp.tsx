import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { Buttons, Icons } from '../components';
import { MAIN_TAB } from '../constants/screens';

const Tab = createBottomTabNavigator<HourChat.Navigation.MainTab>();

const Empty = () => null;

const MainApp = () => {
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
        component={Empty}
        options={{
          tabBarIcon: Icons.Mains.Chat,
          tabBarLabel: 'Chat',
        }}
      />
      <Tab.Screen
        name={MAIN_TAB.NEAR_ME}
        component={Empty}
        options={{
          tabBarIcon: Icons.Mains.NearMe,
          tabBarLabel: 'Near Me',
        }}
      />
      <Tab.Screen
        name={MAIN_TAB.PROFILE}
        component={Empty}
        options={{
          tabBarIcon: Icons.Mains.Profile,
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainApp;
