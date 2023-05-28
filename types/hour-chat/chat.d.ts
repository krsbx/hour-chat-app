import { Timestamp } from '@firebase/firestore';

export type MessageData = {
  senderId: number;
  timestamp: Timestamp;
  body: number;
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
