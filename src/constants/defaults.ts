import { z } from 'zod';
import { auths } from '../schema';

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
