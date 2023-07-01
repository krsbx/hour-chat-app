import { CHAT_TYPE, RESOURCE_NAME } from '../../src/constants/common';

export type ResourceName = ValueOf<typeof RESOURCE_NAME>;

export type File = {
  uri: string;
  name: string;
  type?: string | null;
};

export type FileHref = File & {
  href: string;
};

export type ChatType = ValueOf<typeof CHAT_TYPE>;

export type Encryption = {
  key: number[];
  iv: number[];
};
