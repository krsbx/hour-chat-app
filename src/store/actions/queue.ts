import { AppDispatch } from '..';
import {
  FilePayload,
  MessageQueue,
  QueueActionType,
} from '../actions-types/queue';

export const enqueuMessage =
  (payload: MessageQueue) => (dispatch: AppDispatch) =>
    dispatch({
      type: QueueActionType.ENQUEUE_MESSAGE,
      payload,
    });

export const dequeueMessage = () => (dispatch: AppDispatch) =>
  dispatch({
    type: QueueActionType.DEQUEU_MESSAGE,
  });

export const enqueuFailedMessage =
  (payload: MessageQueue) => (dispatch: AppDispatch) =>
    dispatch({
      type: QueueActionType.ENQUEUE_FAILED_MESSAGE,
      payload,
    });

export const dequeueFailedMessage = () => (dispatch: AppDispatch) =>
  dispatch({
    type: QueueActionType.DEQUEUE_FAILED_MESSAGE,
  });

export const enqueuFile = (payload: FilePayload) => (dispatch: AppDispatch) =>
  dispatch({
    type: QueueActionType.ENQUEUE_FILE,
    payload,
  });

export const dequeueFile = () => (dispatch: AppDispatch) =>
  dispatch({
    type: QueueActionType.DEQUEUE_FILE,
  });

export const resetQueu = () => (dispatch: AppDispatch) =>
  dispatch({
    type: QueueActionType.RESET,
  });
