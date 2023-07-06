import { ImageRequireSource, ImageURISource } from 'react-native';
import { CHAT_TYPE, RESOURCE_NAME } from '../../src/constants/common';
import { GENDER } from '../../src/constants/resources';

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

export type Dimensions = {
  width: number;
  height: number;
};

export type Position = {
  x: number;
  y: number;
};

export type ImageSource = ImageURISource | FileHref | ImageRequireSource;

export type Gender = ValueOf<typeof GENDER>;

export type Notification = {
  title: string;
  body: string;
  senderId: string;
  type: ChatType;
  uuid: string;
};
