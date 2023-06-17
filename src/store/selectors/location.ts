import { AppState } from '..';

export const getUserCoordinate = (state: AppState) =>
  state.location?.coords ?? {};
