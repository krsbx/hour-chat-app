import _ from 'lodash';
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
    middleName: z.string().min(3).optional(),
    lastName: z.string().min(3).optional(),
    dob: z.string().refine((dob) => {
      if (_.isNull(dob)) return true;

      return moment(dob).isValid();
    }),
    gender: z
      .enum([GENDER.MALE, GENDER.FEMALE, GENDER.OTHER])
      .nullable()
      .default(GENDER.OTHER),
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
