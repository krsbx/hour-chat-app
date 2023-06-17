import { GeolocationResponse } from '@react-native-community/geolocation';

export enum LocationActionType {
  SET = 'location.login',
  UPDATE = 'location.update',
  DELETE = 'location.delete',
}

export type SetLocation = {
  type: LocationActionType.SET;
  payload: GeolocationResponse;
};

export type UpdateLocation = {
  type: LocationActionType.UPDATE;
  payload: Partial<GeolocationResponse>;
};

export type DeleteLocation = {
  type: LocationActionType.DELETE;
};
