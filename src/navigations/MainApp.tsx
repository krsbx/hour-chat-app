import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import _ from 'lodash';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { Buttons, Icon } from '../components';
import { MAIN_TAB, TAB_HIDEABLE } from '../constants/screens';
import useFirebaseDeviceToken from '../hooks/listeners/useFirebaseDeviceToken';
import useLastMessageListener from '../hooks/listeners/useLastMessageListener';
import useStoryListener from '../hooks/listeners/useStoryListener';
import useWatchAuthToken from '../hooks/listeners/useWatchAuthToken';
import useWatchPosition from '../hooks/listeners/useWatchPosition';
import useChatMediaQueue from '../hooks/queues/useChatMediaQueue';
import useChatMessageQueue from '../hooks/queues/useChatMessageQueue';
import { Content } from '../screens';
import ChatStack from './ChatStack';
import CreateStoryStack from './CreateStoryStack';
import ProfileStack from './ProfileStack';
import StoryTab from './StoryTab';

const Tab = createBottomTabNavigator<HourChat.Navigation.MainTab>();

const MainApp = () => {
  useWatchPosition();
  useWatchAuthToken();
  useChatMessageQueue();
  useChatMediaQueue();
  useLastMessageListener();
  useFirebaseDeviceToken();
  useStoryListener();

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
            tabBarHideOnKeyboard: true,
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
        name={MAIN_TAB.CREATE_STORY}
        component={CreateStoryStack}
        options={{
          tabBarIcon: Icon.Main.CreateStory,
          tabBarLabelStyle: { display: 'none' },
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name={MAIN_TAB.STORY}
        component={StoryTab}
        options={{
          tabBarIcon: Icon.Main.Story,
          tabBarLabel: 'Story',
        }}
      />
      <Tab.Screen
        name={MAIN_TAB.PROFILE}
        component={ProfileStack}
        options={{
          tabBarIcon: Icon.Main.Profile,
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainApp;
