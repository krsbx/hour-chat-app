import type { Timestamp } from '@firebase/firestore';

export type MessageData = {
  senderId: string;
  timestamp: Timestamp;
  body: string;
};

export type PrivateMetadata = MessageData & {
  uuid: string; // receiverId
};

export type GroupMetadata = MessageData & {
  name: string;
  uuid: string;
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
