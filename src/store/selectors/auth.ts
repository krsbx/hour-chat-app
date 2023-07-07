import { createSelector } from 'reselect';
import { AppState } from '..';

export const getAuth = (state: AppState) => state.auth;

export const getAuthToken = createSelector(getAuth, (auth) => auth.token);

export const getAuthEmailStatus = createSelector(
  getAuth,
  (auth) => auth.isEmailVerified
);
