export type LastMessageReducer = {
  privates: HourChat.Chat.PrivateMetadata[];
  groups: HourChat.Chat.GroupMetadata[];
};

export enum LastMessageActionType {
  SET_PRIVATES = 'last-message.privates.set',
  SET_GROUPS = 'last-message.groups.set',
}

export type SetPrivateLastMessages = {
  type: LastMessageActionType.SET_PRIVATES;
  payload: HourChat.Chat.PrivateMetadata[];
};
export type SetGroupLastMessages = {
  type: LastMessageActionType.SET_GROUPS;
  payload: HourChat.Chat.GroupMetadata[];
};
