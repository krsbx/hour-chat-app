import { isAxiosError } from 'axios';
import _ from 'lodash';
import type { UniqueConstraintError, ValidationError } from 'sequelize';
import { hasOwnProperty } from '../common';

export const onRegisterError = <T>(
  error: T,
  setFieldError: (field: string, message: string | undefined) => void
) => {
  if (!isAxiosError(error)) return;
  const response = error.response?.data;

  if (!response) return;

  if (hasOwnProperty(response, 'name') && hasOwnProperty(response, 'errors')) {
    const { errors }: UniqueConstraintError | ValidationError = response;
    _.map(errors, ({ path }) => {
      setFieldError(`step2.${path}`, `${_.capitalize(path)} already in use`);
    });
  }
};

export const onLoginError = <T>(
  error: T,
  setFieldError: (field: string, message: string | undefined) => void
) => {
  if (!isAxiosError(error)) return;
  const status = error.response?.status;

  if (status === 404) {
    setFieldError('identifier', 'User not found');
  }

  if (status === 400) {
    setFieldError('password', 'Incorrect password');
  }
};
