import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { PROFILE_STACK } from '../constants/screens';
import { Profile } from '../screens';

const Stack = createStackNavigator<HourChat.Navigation.ProfileStack>();

const Empty = () => null;

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={PROFILE_STACK.MAIN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={PROFILE_STACK.MAIN} component={Profile.MainProfile} />
      <Stack.Screen name={PROFILE_STACK.SETTING} component={Empty} />
      <Stack.Screen name={PROFILE_STACK.FRIEND_LIST} component={Empty} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
