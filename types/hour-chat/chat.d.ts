import type { Timestamp } from '@firebase/firestore';

export type MessageData = {
  senderId: string;
  timestamp: Timestamp | string | Date;
  body: string;
  files: HourChat.Type.File[];
  fromQueue?: boolean; // Indicator to determine the message source
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
      timestamp: Timestamp | string | Date;
    }
  | {
      members: string[];
      timestamp: Timestamp | string | Date;
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
