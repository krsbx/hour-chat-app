import { Timestamp } from '@firebase/firestore';

export type MessageData = {
  senderId: number;
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
      typing: number[];
      timestamp: Timestamp;
    }
  | {
      members: number[];
      timestamp: Timestamp;
      typing;
    };

export type ChatMessageHistory = PrivateMetadata | GroupMetadata;

export type PrivateMessageHistory = Record<number, PrivateMetadata>;

export type GroupMessageHistory = Record<number, GroupMetadata>;
