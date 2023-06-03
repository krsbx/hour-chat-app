import { z } from 'zod';
import { auths } from '../schema';

export const DEFAULT_REGISTER_VALUE: z.infer<typeof auths.registerSchema> = {
  step1: {
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: null,
  },
  step2: {
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  },
};
