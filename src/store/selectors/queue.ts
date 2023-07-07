import { createSelector } from 'reselect';
import { AppState } from '..';
import { FilePayload } from '../actions-types/queue';

export const getMessageQueue = (state: AppState) => state.queue.messages;

export const getFileQueue = (state: AppState): FilePayload[] =>
  state.queue.files;

export const getCurrentMessageQueue = ({
  type,
  uuid,
}: {
  type: HourChat.Type.ChatType;
  uuid: string;
}) =>
  createSelector(getMessageQueue, (messages) =>
    messages.filter((message) => message.type === type && message.uuid === uuid)
  );
