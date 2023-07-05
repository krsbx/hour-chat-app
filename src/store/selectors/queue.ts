import { AppState } from '..';

export const getMessageQueue = (state: AppState) => state.queue.messages;

export const getFileQueue = (state: AppState) => state.queue.files;
