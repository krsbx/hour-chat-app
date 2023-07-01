import { AppState } from '..';

export const getEncryptor = (state: AppState) => state.encryptor;

export const getCurrentEncryptor = (state: AppState) =>
  state.encryptor.instance;
