export const MAIN_STACK = {
  AUTH: 'auth-stack',
  MAIN: 'bottom-tab',
} as const;

export const AUTH_STACK = {
  LOGIN: 'auth.login.screen',
  REGISTER: 'auth.register.screen',
} as const;

export const MAIN_TAB = {
  CHAT: 'bottom.chat.screen',
  NEAR_ME: 'bottom.near-me.screen',
  PROFILE: 'bottom.profile.screen',
} as const;
