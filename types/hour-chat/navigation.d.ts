import { AUTH_STACK, MAIN_STACK, MAIN_TAB } from '../../src/constants/screens';

export type AuthStack = {
  [AUTH_STACK.LOGIN]: undefined;
  [AUTH_STACK.REGISTER]: undefined;
};

export type MainStack = {
  [MAIN_STACK.AUTH]: {};
  [MAIN_STACK.MAIN]: {};
};

export type MainTab = {
  [MAIN_TAB.CHAT]: undefined;
  [MAIN_TAB.NEAR_ME]: undefined;
  [MAIN_TAB.PROFILE]: undefined;
};

export type TabIcon = {
  focused: boolean;
  color: string;
  size: number;
};
