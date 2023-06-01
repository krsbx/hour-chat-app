import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import {
  AuthReducer,
  SetAuthToken,
  RemoveAuthToken,
  AuthActionType as ActionType,
} from '../actions-types/auth';

const initialState = {} as AuthReducer;

const reducer = (
  state = _.cloneDeep(initialState),
  action: SetAuthToken | RemoveAuthToken
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
      return {
        token: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
