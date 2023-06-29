import { AppState } from '..';

export const getChatEncryption = (state: AppState) => state.encryption;

export const getCurrentEncryption =
  (type: HourChat.Type.ChatType, uuid: string) => (state: AppState) =>
    state.encryption[type][uuid];
