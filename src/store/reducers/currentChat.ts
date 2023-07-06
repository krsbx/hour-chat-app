import { CHAT_TYPE } from '../../constants/common';
import {
  CurrentChatActionType as ActionType,
  CurrentChatReducer,
  DeleteCurrentChat,
  SetCurrentChat,
} from '../actions-types/currentChat';

const initialState: CurrentChatReducer = {
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

const reducer = (
  state = initialState,
  action: SetCurrentChat | DeleteCurrentChat
): CurrentChatReducer => {
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
