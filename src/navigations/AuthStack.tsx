import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from '../screens/Auth';
import { AUTH_STACK } from '../constants/screens';

const Stack = createStackNavigator<HourChat.Navigation.AuthStack>();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={AUTH_STACK.REGISTER}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AUTH_STACK.LOGIN} component={Auth.Login} />
      <Stack.Screen name={AUTH_STACK.REGISTER} component={Auth.Register} />
    </Stack.Navigator>
  );
}

export default AuthStack;
