import moment from 'moment';
import validator from 'validator';
import { z } from 'zod';
import { GENDER } from '../constants/resources';

export const loginSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(5),
});

export const registerSchema = z.object({
  step1: z.object({
    firstName: z.string().min(3),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    dob: z
      .string()
      .optional()
      .refine((date) => {
        if (!date) return true;

        return moment(date).isValid();
      }),
    gender: z.enum([GENDER.MALE, GENDER.FEMALE, GENDER.OTHER]).optional(),
  }),
  step2: z
    .object({
      email: z.string().email(),
      username: z.string().min(5),
      phoneNumber: z.string().refine(validator.isMobilePhone),
      password: z.string().min(5),
      confirmPassword: z.string().min(5),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          path: ['confirmPassword'],
          message: 'Confirmation password did not match',
        });
      }
    }),
});

export const otpSchema = z.object({
  code: z.string().length(6),
});
