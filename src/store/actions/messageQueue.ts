import { AppDispatch } from '..';
import { MessageQueueActionType } from '../actions-types/messageQueue';

export const enqueuMessage =
  (payload: HourChat.Chat.MessageQueuePayload) => (dispatch: AppDispatch) =>
    dispatch({
      type: MessageQueueActionType.ENQUEUE,
      payload,
    });

export const dequeueMessage = () => (dispatch: AppDispatch) =>
  dispatch({
    type: MessageQueueActionType.DEQUEU,
  });
