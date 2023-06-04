import { AppState } from '..';

export const getAuth = (state: AppState) => state.auth;

export const getAuthToken = (state: AppState) => getAuth(state).token;

export const getAuthEmailStatus = (state: AppState) =>
  getAuth(state).isEmailVerified;
