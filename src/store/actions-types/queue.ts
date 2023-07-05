export type FilePayload = {
  source: HourChat.Type.FileHref;
  target: {
    uuid: string;
    type: HourChat.Type.ChatType;
  };
};

export type QueuReducer = {
  messages: HourChat.Chat.MessageQueuePayload[];
  files: FilePayload[];
};

export enum QueueActionType {
  ENQUEUE_MESSAGE = 'queue.message.enqueu',
  DEQUEU_MESSAGE = 'queue.message.dequeue',
  ENQUEUE_FILE = 'queue.file.enqueu',
  DEQUEUE_FILE = 'queue.file.dequeue',
}

export type EnqueueMessage = {
  type: QueueActionType.ENQUEUE_MESSAGE;
  payload: HourChat.Chat.MessageQueuePayload;
};

export type DequeuMessage = {
  type: QueueActionType.DEQUEU_MESSAGE;
};

export type EnqueueFile = {
  type: QueueActionType.ENQUEUE_FILE;
  payload: FilePayload;
};

export type DequeueFile = {
  type: QueueActionType.DEQUEUE_FILE;
};
