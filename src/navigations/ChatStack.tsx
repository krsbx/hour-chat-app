import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CHAT_STACK } from '../constants/screens';
import { Chat } from '../screens';

const Stack = createStackNavigator<HourChat.Navigation.ChatStack>();

const Empty = () => null;

const ChatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={CHAT_STACK.LIST}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={CHAT_STACK.LIST} component={Chat.ChatList} />
      <Stack.Screen name={CHAT_STACK.VIEW} component={Chat.ChatView} />
      <Stack.Screen name={CHAT_STACK.DETAIL} component={Empty} />
    </Stack.Navigator>
  );
};

export default ChatStack;
