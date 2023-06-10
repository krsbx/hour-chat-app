export const MAIN_STACK = {
  LAUNCH: 'launch.screen',
  AUTH: 'auth-stack',
  MAIN: 'bottom-tab',
} as const;

export const AUTH_STACK = {
  LOGIN: 'auth.login.screen',
  REGISTER: 'auth.register.screen',
  OTP: 'auth.otp.screen',
} as const;

export const CHAT_STACK = {
  LIST: 'chat.list.screen',
  VIEW: 'chat.view.screen',
  DETAIL: 'chat.detail.screen',
} as const;

export const MAIN_TAB = {
  CHAT: 'bottom.chat.screen',
  NEAR_ME: 'bottom.near-me.screen',
  PROFILE: 'bottom.profile.screen',
} as const;
