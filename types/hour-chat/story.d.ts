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
  userId: string;
  dislikes: string[];
  likes: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type StoryWithUuid = Story & {
  uuid: string;
};
