import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import validator from 'validator';
import { z } from 'zod';
import { AppDispatch } from '..';
import { auths } from '../../schema';
import { AuthActionType } from '../actions-types/auth';
import axios from '../axios';

export const requestEmailOtp = (token?: string) => async () => {
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (token) {
    return axios.post('/email-otps', {}, headers);
  }

  return axios.post('/email-otps', {});
};

export const loginUser =
  (payload: { identifier: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    const isEmail = validator.isEmail(payload.identifier);
    const key = isEmail ? 'email' : 'username';

    Object.assign(payload, {
      [key]: payload.identifier,
    });

    const { data } = await axios.post('/auth/login', payload);
    const { token } = data.data;

    dispatch({
      type: AuthActionType.LOGIN,
      payload: token,
    });

    const decoded = jwtDecode<HourChat.Resource.User>(data.data);

    return decoded;
  };

export const registerUser =
  (payload: z.infer<typeof auths.registerSchema>) =>
  async (dispatch: AppDispatch) => {
    const newPayload = _.reduce(
      payload,
      (prev, curr) => {
        Object.assign(prev, curr);

        return prev;
      },
      {} as (typeof payload)['step1'] & (typeof payload)['step2']
    );

    const { data } = await axios.post('/auth/register', newPayload);

    const { token } = data.data;

    dispatch({
      type: AuthActionType.LOGIN,
      payload: token,
    });

    await requestEmailOtp(token)();

    return token;
  };

export const verifyEmail =
  ({ code }: z.infer<typeof auths.otpSchema>) =>
  async (dispatch: AppDispatch) => {
    await axios.post(`/email-otps/verify?code=${code}`);

    dispatch({
      type: AuthActionType.UPDATE,
      payload: {
        isEmailVerified: true,
      },
    });
  };
