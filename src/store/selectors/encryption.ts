import { createSelector } from 'reselect';
import { AppState } from '..';

export const getChatEncryption = (state: AppState) => state.encryption;

export const getCurrentEncryption = (
  type: HourChat.Type.ChatType,
  uuid: string
) => createSelector(getChatEncryption, (encryption) => encryption[type][uuid]);
