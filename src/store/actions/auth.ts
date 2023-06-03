import validator from 'validator';
import { AppDispatch } from '..';
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
      type: AuthActionType.LOGIN as never,
      payload: data.data,
    });
  };
