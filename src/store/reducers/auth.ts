import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import {
  AuthActionType as ActionType,
  AuthReducer,
  RemoveAuthToken,
  SetAuthToken,
} from '../actions-types/auth';

const initialState = {
  token: null,
} as AuthReducer;

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
      return _.cloneDeep(initialState);
    }

    default: {
      return state;
    }
  }
};

export default reducer;
