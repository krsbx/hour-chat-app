export type ConfigReducer = {
  uuid: string;
  type: HourChat.Type.ChatType;
  name: string;
  files: HourChat.Type.File[];
  attachment: HourChat.Type.File[];
  config: HourChat.Type.Encryption;
};

export enum ConfigActionType {
  SET = 'config.set',
  DELETE = 'config.delete',
}

export type SetConfig = {
  type: ConfigActionType.SET;
  payload: Partial<ConfigReducer>;
};

export type DeleteConfig = {
  type: ConfigActionType.DELETE;
};
