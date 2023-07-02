import { CHAT_TYPE } from '../../constants/common';
import {
  ConfigActionType as ActionType,
  ConfigReducer,
  DeleteConfig,
  SetConfig,
} from '../actions-types/config';

const initialState: ConfigReducer = {
  uuid: '',
  type: CHAT_TYPE.PRIVATE,
  name: '',
  files: [],
  attachment: [],
  config: {
    iv: [],
    key: [],
  },
};

const reducer = (state = initialState, action: SetConfig | DeleteConfig) => {
  switch (action.type) {
    case ActionType.SET: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case ActionType.DELETE: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
