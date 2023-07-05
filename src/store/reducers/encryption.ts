import _ from 'lodash';
import { CHAT_TYPE } from '../../constants/common';
import { hasOwnProperty } from '../../utils/common';
import {
  DeleteEncryption,
  EncryptionActionType as ActionType,
  EncryptionReducer,
  ResetEncryption,
  SetEncryption,
} from '../actions-types/encryption';

const initialState: EncryptionReducer = {
  [CHAT_TYPE.GROUP]: {},
  [CHAT_TYPE.PRIVATE]: {},
};

const reducer = (
  state = _.cloneDeep(initialState),
  action: DeleteEncryption | ResetEncryption | SetEncryption
): EncryptionReducer => {
  switch (action.type) {
    case ActionType.SET: {
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          [action.payload.uuid]: action.payload.config,
        },
      };
    }

    case ActionType.DELETE: {
      return _.omit(state, [
        `${action.payload.type}.${action.payload.uuid}`,
      ]) as EncryptionReducer;
    }

    case ActionType.RESET: {
      if (hasOwnProperty<HourChat.Type.ChatType>(action, 'payload')) {
        switch (action.payload) {
          case CHAT_TYPE.GROUP: {
            return {
              ...state,
              [CHAT_TYPE.GROUP]: {},
            };
          }

          case CHAT_TYPE.PRIVATE: {
            return {
              ...state,
              [CHAT_TYPE.PRIVATE]: {},
            };
          }
        }
      }

      return _.cloneDeep(initialState);
    }

    default: {
      return state;
    }
  }
};

export default reducer;
