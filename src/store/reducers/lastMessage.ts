import {
  LastMessageActionType as ActionType,
  LastMessageReducer,
  SetGroupLastMessages,
  SetPrivateLastMessages,
} from '../actions-types/lastMessage';

const initialState: LastMessageReducer = {
  groups: [],
  privates: [],
};

const reducer = (
  state = initialState,
  action: SetPrivateLastMessages | SetGroupLastMessages
): LastMessageReducer => {
  switch (action.type) {
    case ActionType.SET_PRIVATES: {
      return {
        ...state,
        privates: action.payload,
      };
    }

    case ActionType.SET_GROUPS: {
      return {
        ...state,
        groups: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
