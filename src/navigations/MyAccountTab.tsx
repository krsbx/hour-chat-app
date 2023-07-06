import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { FONT_SIZE } from '../constants/fonts';
import { MY_ACCOUNT_TAB } from '../constants/screens';
import { Setting } from '../screens';
import { COLOR_PALETTE } from '../utils/theme';

const Tab = createMaterialTopTabNavigator<HourChat.Navigation.MyAccountTab>();

const MyAccountTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={MY_ACCOUNT_TAB.PUBLIC}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLOR_PALETTE.BLUE_10,
        },
        tabBarActiveTintColor: COLOR_PALETTE.WHITE,
        tabBarInactiveTintColor: COLOR_PALETTE.NEUTRAL_40,
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: FONT_SIZE.EXTRA_EXTRA_SMALL,
        },
        tabBarIndicatorStyle: {
          backgroundColor: COLOR_PALETTE.WHITE,
          height: scale(3),
        },
      }}
    >
      <Tab.Screen
        name={MY_ACCOUNT_TAB.PUBLIC}
        component={Setting.Public}
        options={{
          tabBarLabel: 'Public',
        }}
      />
      <Tab.Screen
        name={MY_ACCOUNT_TAB.PRIVATE}
        component={Setting.Private}
        options={{
          tabBarLabel: 'Private',
        }}
      />
    </Tab.Navigator>
  );
};

export default MyAccountTab;
