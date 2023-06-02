import { AUTH_STACK } from '../../src/constants/screens';

export type AppNavigationRoute = {};

export type AuthStack = {
  [AUTH_STACK.LOGIN]: undefined;
  [AUTH_STACK.REGISTER]: undefined;
};
