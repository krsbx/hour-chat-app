import type { Timestamp } from '@firebase/firestore';

export type MessageData = {
  senderId: string;
  timestamp: Timestamp;
  body: string;
  files: HourChat.Type.File[];
};

export type PrivateMetadata = MessageData & {
  total: number;
  uuid: string; // receiverId
};

export type GroupMetadata = PrivateMetadata & {
  name: string;
};

export type Metadata =
  | {
      typing: string[];
      timestamp: Timestamp;
    }
  | {
      members: string[];
      timestamp: Timestamp;
      typing: string[];
    };

export type ChatMessageHistory = PrivateMetadata | GroupMetadata;

export type PrivateMessageHistory = Record<string, PrivateMetadata>;

export type GroupMessageHistory = Record<string, GroupMetadata>;

export type BaseChatPayload = Pick<MessageData, 'body' | 'files'>;

export type PrivateChatPayload = BaseChatPayload & {
  receiverId: string;
};

export type GroupChatPayload = BaseChatPayload & {
  uuid: string;
};
