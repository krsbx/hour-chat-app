import { CHAT_TYPE } from '../../constants/common';
import {
  DeleteEncryptor,
  EncryptorActionType as ActionType,
  EncryptorReducer,
  SetEncryptor,
} from '../actions-types/encryptor';

const initialState: EncryptorReducer = {
  instance: null,
  uuid: '',
  type: CHAT_TYPE.PRIVATE,
  name: '',
  files: [],
  config: {
    iv: [],
    key: [],
  },
};

const reducer = (
  state = initialState,
  action: SetEncryptor | DeleteEncryptor
) => {
  switch (action.type) {
    case ActionType.SET: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case ActionType.DELETE: {
      return {
        ...state,
        instance: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
