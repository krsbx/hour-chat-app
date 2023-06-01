export enum AuthActionType {
  LOGIN = 'auth.login',
  LOGOUT = 'auth.logout',
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
