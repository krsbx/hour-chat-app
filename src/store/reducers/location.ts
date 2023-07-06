import { GeolocationResponse } from '@react-native-community/geolocation';
import {
  DeleteLocation,
  LocationActionType as ActionType,
  SetLocation,
  UpdateLocation,
} from '../actions-types/location';

const initialState = {
  coords: {},
  timestamp: 0,
} as GeolocationResponse;

const reducer = (
  state = initialState,
  action: SetLocation | UpdateLocation | DeleteLocation
): GeolocationResponse => {
  switch (action.type) {
    case ActionType.SET: {
      return action.payload;
    }

    case ActionType.UPDATE: {
      return {
        ...state,
        ...action.payload,
        coords: {
          ...state.coords,
          ...action.payload.coords,
        },
      };
    }

    case ActionType.DELETE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
