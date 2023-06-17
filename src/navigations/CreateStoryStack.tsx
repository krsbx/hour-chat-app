import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CREATE_STORY_STACK } from '../constants/screens';
import { CreateStory } from '../screens';

const Stack = createStackNavigator<HourChat.Navigation.CreateStory>();

const CreateStoryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={CREATE_STORY_STACK.FORM}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={CREATE_STORY_STACK.FORM}
        component={CreateStory.Form}
      />
      <Stack.Screen
        name={CREATE_STORY_STACK.PREVIEW}
        component={CreateStory.Preview}
      />
    </Stack.Navigator>
  );
};

export default CreateStoryStack;
