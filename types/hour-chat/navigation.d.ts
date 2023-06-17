import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  AUTH_STACK,
  CHAT_STACK,
  CREATE_STORY_STACK,
  MAIN_STACK,
  MAIN_TAB,
  STORY_TAB,
} from '../../src/constants/screens';

export type AuthStack = {
  [AUTH_STACK.LOGIN]: undefined;
  [AUTH_STACK.REGISTER]: undefined;
  [AUTH_STACK.OTP]: undefined;
};

export type CreateStory = {
  [CREATE_STORY_STACK.FORM]: undefined;
  [CREATE_STORY_STACK.PREVIEW]: undefined;
};

export type StoryTab = {
  [STORY_TAB.USERS]: undefined;
  [STORY_TAB.ME]: undefined;
};

export type ChatStack = {
  [CHAT_STACK.LIST]: undefined;
  [CHAT_STACK.VIEW]: {
    uuid: string | number;
    type: HourChat.Type.ChatType;
    name: string;
  };
  [CHAT_STACK.DETAIL]: undefined;
};

export type MainTab = {
  [MAIN_TAB.CHAT]: NavigatorScreenParams<ChatStack>;
  [MAIN_TAB.NEAR_ME]: undefined;
  [MAIN_TAB.CREATE_STORY]: NavigatorScreenParams<CreateStory>;
  [MAIN_TAB.STORY]: NavigatorScreenParams<StoryTab>;
  [MAIN_TAB.PROFILE]: undefined;
};

export type MainStack = {
  [MAIN_STACK.LAUNCH]: undefined;
  [MAIN_STACK.AUTH]: NavigatorScreenParams<AuthStack>;
  [MAIN_STACK.MAIN]: NavigatorScreenParams<MainTab>;
};

export type TabIcon = {
  focused: boolean;
  color: string;
  size: number;
};

export type AuthStackProps<T extends keyof AuthStack> = CompositeScreenProps<
  StackScreenProps<AuthStack, T>,
  StackScreenProps<MainStack>
>;

export type ChatStackProps<T extends keyof ChatStack> = StackScreenProps<
  ChatStack,
  T
>;

export type StoryTabProps<T extends keyof StoryTab> = MaterialTopTabScreenProps<
  StoryTab,
  T
>;

export type CreateStoryProps<T extends keyof CreateStory> =
  CompositeScreenProps<
    StackScreenProps<CreateStory, T>,
    StackScreenProps<MainTab>
  >;

export type MainTabProps<T extends keyof MainTabProps> = CompositeScreenProps<
  BottomTabScreenProps<MainTab, T>,
  StackScreenProps<MainStack>
>;

export type MainStackProps<T extends keyof MainStack> = CompositeScreenProps<
  StackScreenProps<MainStack, T>,
  BottomTabScreenProps<MainTab>
>;

export type AuthStackNavigation<T extends keyof AuthStack> =
  AuthStackProps<T>['navigation'];

export type MainTabNavigation<T extends keyof MainTab> =
  MainTabProps<T>['navigation'];

export type MainStackNavigation<T extends keyof MainStack> =
  MainStackProps<T>['navigation'];

export type ChatStackNavigation<T extends keyof ChatStack> =
  ChatStackProps<T>['navigation'];
