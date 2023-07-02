export type MessageQueuReducer = {
  queue: HourChat.Chat.MessageQueuePayload[];
};

export enum MessageQueueActionType {
  ENQUEUE = 'message-queue.enqueu',
  DEQUEU = 'message-queue.dequeue',
}

export type EnqueueMessage = {
  type: MessageQueueActionType.ENQUEUE;
  payload: HourChat.Chat.MessageQueuePayload;
};

export type DequeuMessage = {
  type: MessageQueueActionType.DEQUEU;
};
