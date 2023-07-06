import _ from 'lodash';

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
  MEDIA: 'chat.media.screen',
} as const;

export const MAIN_TAB = {
  CHAT: 'bottom.chat.screen',
  NEAR_ME: 'bottom.near-me.screen',
  CREATE_STORY: 'bottom.story.button',
  STORY: 'bottom.story.screen',
  PROFILE: 'bottom.profile.screen',
} as const;

export const CREATE_STORY_STACK = {
  FORM: 'create.story.screen',
  PREVIEW: 'preview.story.screen',
} as const;

export const STORY_TAB = {
  USERS: 'users.story.screen',
  ME: 'my.story.screen',
} as const;

export const PROFILE_STACK = {
  MAIN: 'profile.main.screen',
  MY_ACCOUNT: 'profile.my-account.screen',
  MY_CONNECTION: 'profile.my-connection.screen',
} as const;

export const MY_ACCOUNT_TAB = {
  PUBLIC: 'my-account.public.screen',
  PRIVATE: 'my-account.private.screen',
} as const;

export const TAB_HIDEABLE = _(CHAT_STACK).omit(['LIST']).map().value();
