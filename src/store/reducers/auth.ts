import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import {
  AuthActionType as ActionType,
  AuthReducer,
  RemoveAuthToken,
  SetAuthToken,
  UpdateAuthData,
} from '../actions-types/auth';

const initialState = {
  token: null,
  deviceToken: null,
  firebaseToken: null,
} as AuthReducer;

const reducer = (
  state = _.cloneDeep(initialState),
  action: SetAuthToken | RemoveAuthToken | UpdateAuthData
): AuthReducer => {
  switch (action.type) {
    case ActionType.LOGIN: {
      const decoded = jwtDecode<HourChat.Resource.User>(
        _.isString(action.payload) ? action.payload : action.payload.token
      );

      if (_.isString(action.payload))
        return {
          ...state,
          ...decoded,
          token: action.payload,
        };

      return {
        ...state,
        ...decoded,
        token: action.payload.token,
        firebaseToken: action.payload.firebaseToken,
      };
    }

    case ActionType.LOGOUT: {
      return _.cloneDeep(initialState);
    }

    case ActionType.UPDATE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
