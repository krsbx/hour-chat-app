import _ from 'lodash';
import { z } from 'zod';
import { auths, chats } from '../schema';

export const DEFAULT_REGISTER_VALUE: z.infer<typeof auths.registerSchema> = {
  step1: {
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: undefined,
  },
  step2: {
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  },
};

export const DEFAULT_LOGIN_VALUE: z.infer<typeof auths.loginSchema> = {
  identifier: '',
  password: '',
};

export const DEFAULT_OTP_CODE: z.infer<typeof auths.otpSchema> = {
  code: '',
};

export const DEFAULT_MESSAGE_VALUE: z.infer<typeof chats.messageSchema> = {
  body: '',
  files: [],
};

export const createIdentityValue = (user: HourChat.Resource.User) => {
  const payload = _.pick(user, [
    'firstName',
    'lastName',
    'middleName',
    'dob',
    'gender',
    'avatar',
  ]);

  payload.lastName ??= '';
  payload.middleName ??= '';
  payload.avatar ??= '';
  payload.dob ??= '';

  return payload as {
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string | Date;
    avatar: string;
    gender: HourChat.Type.Gender;
  };
};

export const createCredentialValue = (user: HourChat.Resource.User) => {
  const payload = _.pick(user, ['email', 'phoneNumber', 'username']);

  return payload;
};
