import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import validator from 'validator';
import { z } from 'zod';
import { AppDispatch } from '..';
import { auths } from '../../schema';
import { AuthActionType } from '../actions-types/auth';
import axios from '../axios';

export const loginUser =
  (payload: { identifier: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    const isEmail = validator.isEmail(payload.identifier);
    const key = isEmail ? 'email' : 'username';

    Object.assign(payload, {
      [key]: payload.identifier,
    });

    const { data } = await axios.post('/auth/login', payload);

    dispatch({
      type: AuthActionType.LOGIN,
      payload: data.data,
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

    dispatch({
      type: AuthActionType.LOGIN,
      payload: data.data,
    });
  };
