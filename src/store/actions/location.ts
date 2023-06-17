import { GeolocationResponse } from '@react-native-community/geolocation';
import _ from 'lodash';
import { AppDispatch, store } from '..';
import { RESOURCE_NAME } from '../../constants/common';
import { LocationActionType } from '../actions-types/location';
import axios from '../axios';
import { getAuth } from '../selectors/auth';
import { getUserCoordinate } from '../selectors/location';
import { setResource } from './resources';

export const setLocation =
  (payload: GeolocationResponse) => (dispatch: AppDispatch) =>
    dispatch({
      type: LocationActionType.SET,
      payload,
    });

export const updateLocation =
  (payload: Partial<GeolocationResponse>) => (dispatch: AppDispatch) =>
    dispatch({
      type: LocationActionType.UPDATE,
      payload,
    });

export const deleteLocation = () => (dispatch: AppDispatch) =>
  dispatch({
    type: LocationActionType.DELETE,
  });

export const addUserPosition = () => () => {
  const { id } = getAuth(store.getState());
  const { latitude, longitude } = getUserCoordinate(store.getState());

  if (!latitude || !longitude) return;

  axios
    .post(`/user-locations/${id}`, {
      lat: latitude,
      lng: longitude,
    })
    .catch(() => {
      // Do nothing if there is an error
    });
};

export const getNearMe = () => async (dispatch: AppDispatch) => {
  const { data } = await axios.get<
    HourChat.Response.Resources<HourChat.Resource.UserLocation>
  >('/users/near-me');

  dispatch(
    setResource(
      RESOURCE_NAME.USERS,
      _.compact(_.map(data.data, ({ user }) => user as never))
    )
  );

  return data;
};
