import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { FONT_SIZE } from '../constants/fonts';
import { STORY_TAB } from '../constants/screens';
import { Story } from '../screens';
import { COLOR_PALETTE } from '../utils/theme';

const Tab = createMaterialTopTabNavigator<HourChat.Navigation.StoryTab>();

const StoryTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={STORY_TAB.USERS}
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
        name={STORY_TAB.USERS}
        component={Story.UserStory}
        options={{
          tabBarLabel: 'Story Near Me',
        }}
      />
      <Tab.Screen
        name={STORY_TAB.ME}
        component={Story.MyStory}
        options={{
          tabBarLabel: 'My Story',
        }}
      />
    </Tab.Navigator>
  );
};

export default StoryTab;
