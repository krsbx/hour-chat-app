export type CurrentChatReducer = {
  uuid: string;
  type: HourChat.Type.ChatType;
  name: string;
  files: HourChat.Type.File[];
  attachment: HourChat.Type.File[];
  config: HourChat.Type.Encryption;
};

export enum CurrentChatActionType {
  SET = 'current-chat.set',
  DELETE = 'current-chat.delete',
}

export type SetCurrentChat = {
  type: CurrentChatActionType.SET;
  payload: Partial<CurrentChatReducer>;
};

export type DeleteCurrentChat = {
  type: CurrentChatActionType.DELETE;
};
