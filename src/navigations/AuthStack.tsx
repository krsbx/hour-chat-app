import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AUTH_STACK } from '../constants/screens';
import Auth from '../screens/Auth';

const Stack = createStackNavigator<HourChat.Navigation.AuthStack>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={AUTH_STACK.LOGIN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AUTH_STACK.LOGIN} component={Auth.Login} />
      <Stack.Screen name={AUTH_STACK.REGISTER} component={Auth.Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
