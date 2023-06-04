export enum AuthActionType {
  LOGIN = 'auth.login',
  LOGOUT = 'auth.logout',
  UPDATE = 'auth.update',
}

export type AuthReducer = HourChat.Resource.User & {
  token: string | null;
};

export type SetAuthToken = {
  type: AuthActionType.LOGIN;
  payload: string;
};

export type RemoveAuthToken = {
  type: AuthActionType.LOGOUT;
};

export type UpdateAuthData = {
  type: AuthActionType.UPDATE;
  payload: Partial<AuthReducer>;
};
