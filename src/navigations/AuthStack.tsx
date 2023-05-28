import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from '../screens/Auth';

const Stack = createStackNavigator<HourChat.Navigation.AuthStack>();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Auth.Login} />
      <Stack.Screen name="Register" component={Auth.Register} />
    </Stack.Navigator>
  );
}

export default AuthStack;
