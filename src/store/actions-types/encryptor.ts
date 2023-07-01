import aesjs from 'aes-js';

export type EncryptorReducer = {
  instance: aesjs.ModeOfOperation.ModeOfOperationOFB | null;
  uuid: string;
  type: HourChat.Type.ChatType;
  name: string;
  files: HourChat.Type.File[];
  config: HourChat.Type.Encryption;
};

export enum EncryptorActionType {
  SET = 'encryptor.set',
  DELETE = 'encryptor.delete',
}

export type SetEncryptor = {
  type: EncryptorActionType.SET;
  payload: Partial<EncryptorReducer>;
};

export type DeleteEncryptor = {
  type: EncryptorActionType.DELETE;
};
