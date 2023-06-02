import _ from 'lodash';
import { z } from 'zod';
import validator from 'validator';
import { GENDER } from '../constants/resources';

export const loginSchema = z
  .object({
    username: z.string().min(5).optional(),
    email: z.string().email().optional(),
    password: z.string().min(5),
  })
  .superRefine(({ email, username }, ctx) => {
    if (_.isEmpty(email) && _.isEmpty(username)) {
      ctx.addIssue({
        code: 'custom',
        path: ['email', 'username'],
        message: 'Email or Username are required',
      });
    }
  });

export const registerSchema = z
  .object({
    firstName: z.string().min(3),
    middleName: z.string().min(3).optional(),
    lastName: z.string().min(3).optional(),
    username: z.string().min(5),
    email: z.string().email(),
    phoneNumber: z.string().refine(validator.isMobilePhone),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
    dob: z.date().optional().nullable().default(null),
    gender: z
      .enum([GENDER.MALE, GENDER.FEMALE, GENDER.OTHER])
      .optional()
      .nullable()
      .default(GENDER.OTHER),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Confirmation password did not match',
      });
    }
  });
