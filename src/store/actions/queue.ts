import { AppDispatch } from '..';
import { FilePayload, QueueActionType } from '../actions-types/queue';

export const enqueuMessage =
  (payload: HourChat.Chat.MessageQueuePayload) => (dispatch: AppDispatch) =>
    dispatch({
      type: QueueActionType.ENQUEUE_MESSAGE,
      payload,
    });

export const dequeueMessage = () => (dispatch: AppDispatch) =>
  dispatch({
    type: QueueActionType.DEQUEU_MESSAGE,
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
