import { CHAT_TYPE } from '../../constants/common';

export type EncryptionReducer = {
  [CHAT_TYPE.GROUP]: Record<string, HourChat.Type.Encryption>;
  [CHAT_TYPE.PRIVATE]: Record<string, HourChat.Type.Encryption>;
};

export enum EncryptionActionType {
  SET = 'encryption.set',
  DELETE = 'encryption.delete',
  RESET = 'encryption.reset',
}

export type SetEncryption = {
  type: EncryptionActionType.SET;
  payload: {
    type: HourChat.Type.ChatType;
    uuid: string;
    config: HourChat.Type.Encryption;
  };
};

export type DeleteEncryption = {
  type: EncryptionActionType.DELETE;
  payload: {
    type: HourChat.Type.ChatType;
    uuid: string;
  };
};

export type ResetEncryption =
  | {
      type: EncryptionActionType.RESET;
    }
  | {
      type: EncryptionActionType.RESET;
      payload: typeof CHAT_TYPE.PRIVATE;
    }
  | {
      type: EncryptionActionType.RESET;
      payload: typeof CHAT_TYPE.GROUP;
    };
