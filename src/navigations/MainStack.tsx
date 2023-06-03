import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MAIN_STACK } from '../constants/screens';
import AuthStack from './AuthStack';
import MainApp from './MainApp';

const Stack = createStackNavigator<HourChat.Navigation.MainStack>();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={MAIN_STACK.MAIN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={MAIN_STACK.AUTH} component={AuthStack} />
      <Stack.Screen name={MAIN_STACK.MAIN} component={MainApp} />
    </Stack.Navigator>
  );
};

export default MainStack;
