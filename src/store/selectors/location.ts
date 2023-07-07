import { createSelector } from 'reselect';
import { AppState } from '..';

export const getLocation = (state: AppState) => state.location;

export const getUserCoordinate = createSelector(
  getLocation,
  (location) => location?.coords ?? {}
);
