import type { Timestamp } from '@firebase/firestore';

export type BaseStory = {
  body?: string;
  file?: {
    uri: string;
    type?: string | null;
    width?: number;
    height?: number;
  };
};

export type Story = BaseStory & {
  userId: number;
  dislikes: number[];
  likes: number[];
  timestamp: Timestamp;
};

export type StoryWithUuid = Story & {
  uuid: string;
};
