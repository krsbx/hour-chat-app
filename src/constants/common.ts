import { DurationInputArg2 } from 'moment';

export const RESOURCE_NAME = {
  USERS: 'users',
  DEVICE_TOKENS: 'device-tokens',
  USER_LOCATIONS: 'user-locations',
} as const;

export const CHAT_TYPE = {
  PRIVATE: 'private',
  GROUP: 'group',
} as const;

export const RESOURCE_EXPIRE_AFTER = {
  AMOUNT: 2,
  UNIT: 'hour',
} as {
  AMOUNT: number;
  UNIT: DurationInputArg2;
};

export const EXPIREABLE_RESOURCE = [RESOURCE_NAME.USERS] as const;
