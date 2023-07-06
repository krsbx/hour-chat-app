import auth from '@react-native-firebase/auth';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import validator from 'validator';
import { z } from 'zod';
import { AppDispatch, store } from '..';
import { RESOURCE_NAME } from '../../constants/common';
import { auths } from '../../schema';
import { AuthActionType, AuthReducer } from '../actions-types/auth';
import { ResourceAction } from '../actions-types/resources';
import axios from '../axios';
import { getAuth } from '../selectors/auth';
import { resetEncryption } from './encryptions';
import { setGroupLastMessages, setPrivateLastMessages } from './lastMessage';
import { updateResource } from './resources';
import { updateUser } from './resources/users';
import { resetStory } from './story';

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

export const updateAuth =
  (payload: Partial<AuthReducer>) => (dispatch: AppDispatch) => {
    dispatch({
      type: AuthActionType.UPDATE,
      payload,
    });
  };

export const loginUser =
  (payload: { identifier: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    const isEmail = validator.isEmail(payload.identifier);
    const key = isEmail ? 'email' : 'username';

    Object.assign(payload, {
      [key]: payload.identifier,
    });

    const { data } = await axios.post<
      HourChat.Response.Resource<{ token: string; firebaseToken: string }>
    >('/auth/login', payload);

    const { token, firebaseToken } = data.data;

    await auth().signInWithCustomToken(firebaseToken);

    dispatch({
      type: AuthActionType.LOGIN,
      payload: data.data,
    });

    const decoded = jwtDecode<HourChat.Resource.User>(token);

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

    const { data } = await axios.post<
      HourChat.Response.Resource<{ token: string; firebaseToken: string }>
    >('/auth/register', newPayload);

    const { token } = data.data;

    dispatch({
      type: AuthActionType.LOGIN,
      payload: data.data,
    });

    await requestEmailOtp(token)();

    return token;
  };

export const verifyEmail =
  ({ code }: z.infer<typeof auths.otpSchema>) =>
  async (dispatch: AppDispatch) => {
    await axios.post(`/email-otps/verify?code=${code}`);

    updateAuth({
      isEmailVerified: true,
    })(dispatch);
  };

export const addDeviceToken =
  (id: string, deviceToken: string) => (dispatch: AppDispatch) => {
    updateAuth({
      deviceToken,
    })(dispatch);

    axios
      .post(`/device-tokens/${id}`, {
        token: deviceToken,
      })
      .catch(() => {
        // Do nothing if there is an error
      });
  };

export const logoutUser = () => (dispatch: AppDispatch) => {
  if (store.getState().auth.firebaseToken) {
    auth()
      .signOut()
      .catch(() => {
        // Do nothing if there is an error
      });
  }

  dispatch({ type: AuthActionType.LOGOUT });
  dispatch({
    type: ResourceAction.users.OVERWRITE,
    payload: [],
  });
  setPrivateLastMessages([])(dispatch);
  setGroupLastMessages([])(dispatch);
  resetEncryption()(dispatch);
  resetStory()(dispatch);
};

export const updateMyData =
  (payload: Partial<HourChat.Resource.User>, query = '', overwrite = false) =>
  async (dispatch: AppDispatch) => {
    const { id } = getAuth(store.getState());

    const { data } = await updateUser(id, payload, query, overwrite)();

    updateAuth(data)(dispatch);
    updateResource(RESOURCE_NAME.USERS, {
      id,
      data,
    });
  };

export const updateMyPassword =
  (payload: { password: string; confirmPassword: string }) =>
  async (dispatch: AppDispatch) => {
    const { id } = getAuth(store.getState());

    const { data } = await updateUser(id, payload as never)();

    updateAuth(data)(dispatch);
  };

export const deleteMyAccount =
  (payload: { password: string }) => async (dispatch: AppDispatch) => {
    const { id } = getAuth(store.getState());
    await axios.post(`/${RESOURCE_NAME.USERS}/${id}/delete`, payload);
    logoutUser()(dispatch);
  };
