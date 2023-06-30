import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { PROFILE_STACK } from '../constants/screens';
import { Profile } from '../screens';

const Stack = createStackNavigator<HourChat.Navigation.ProfileStack>();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={PROFILE_STACK.MAIN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={PROFILE_STACK.MAIN} component={Profile.MainProfile} />
      <Stack.Screen
        name={PROFILE_STACK.MY_CONNECTION}
        component={Profile.MyConnection}
      />
      <Stack.Screen name={PROFILE_STACK.SETTING} component={Profile.Setting} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
