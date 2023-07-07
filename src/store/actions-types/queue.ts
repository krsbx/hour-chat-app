export type FilePayload = {
  source: HourChat.Type.FileHref;
  target: {
    uuid: string;
    type: HourChat.Type.ChatType;
  };
};

export type MessageQueue = HourChat.Chat.GroupChatPayload & {
  type: HourChat.Type.ChatType;
};

export type QueuReducer = {
  messages: MessageQueue[];
  failedMessages: MessageQueue[];
  files: FilePayload[];
};

export enum QueueActionType {
  ENQUEUE_MESSAGE = 'queue.message.enqueu',
  DEQUEU_MESSAGE = 'queue.message.dequeue',
  ENQUEUE_FAILED_MESSAGE = 'queue.failed-message.enqueu',
  DEQUEUE_FAILED_MESSAGE = 'queue.failed-message.dequeue',
  ENQUEUE_FILE = 'queue.file.enqueu',
  DEQUEUE_FILE = 'queue.file.dequeue',
  RESET = 'queue.reset',
}

export type EnqueueMessage = {
  type: QueueActionType.ENQUEUE_MESSAGE;
  payload: MessageQueue;
};

export type DequeuMessage = {
  type: QueueActionType.DEQUEU_MESSAGE;
};
export type EnqueueFailedMessage = {
  type: QueueActionType.ENQUEUE_FAILED_MESSAGE;
  payload: MessageQueue;
};

export type DequeuFailedMessage = {
  type: QueueActionType.DEQUEUE_FAILED_MESSAGE;
};

export type EnqueueFile = {
  type: QueueActionType.ENQUEUE_FILE;
  payload: FilePayload;
};

export type DequeueFile = {
  type: QueueActionType.DEQUEUE_FILE;
};

export type ResetQueue = {
  type: QueueActionType.RESET;
};
