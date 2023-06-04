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
} as AuthReducer;

const reducer = (
  state = _.cloneDeep(initialState),
  action: SetAuthToken | RemoveAuthToken | UpdateAuthData
) => {
  switch (action.type) {
    case ActionType.LOGIN: {
      return {
        ...state,
        ...jwtDecode<HourChat.Resource.User>(action.payload),
        token: action.payload,
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
