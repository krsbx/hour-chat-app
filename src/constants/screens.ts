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
  DETAIL: 'chat.detail.screen',
} as const;

export const MAIN_TAB = {
  CHAT: 'bottom.chat.screen',
  NEAR_ME: 'bottom.near-me.screen',
  CREATE_STORY: 'bottom.story.button',
  STORY: 'bottom.story.screen',
  PROFILE: 'bottom.profile.screen',
} as const;

export const CREATE_STORY_TAB = {
  FORM: 'create.story.screen',
  PREVIEW: 'preview.story.screen',
} as const;

export const TAB_HIDEABLE = _(CHAT_STACK).omit(['LIST']).map().value();
