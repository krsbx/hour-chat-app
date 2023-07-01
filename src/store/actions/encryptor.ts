import { AppDispatch } from '..';
import { createEncryptor as _createEncryptor } from '../../utils/chats/encryption';
import {
  EncryptorActionType,
  EncryptorReducer,
} from '../actions-types/encryptor';

export const createEncryptor =
  (config: HourChat.Type.Encryption) => (dispatch: AppDispatch) => {
    const instance = _createEncryptor(config);

    dispatch({
      type: EncryptorActionType.SET,
      payload: {
        instance,
      },
    });
  };

export const setEncryptor =
  (payload: Partial<EncryptorReducer & { config: HourChat.Type.Encryption }>) =>
  (dispatch: AppDispatch) => {
    if (payload.config) {
      payload.instance = _createEncryptor(payload.config);
    }

    console.log(payload);

    dispatch({
      type: EncryptorActionType.SET,
      payload,
    });
  };

export const deleteEncryptor = () => (dispatch: AppDispatch) => {
  dispatch({
    type: EncryptorActionType.DELETE,
  });
};
