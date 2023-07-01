import { DurationInputArg2 } from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR_PALETTE } from '../utils/theme';

export const RESOURCE_NAME = {
  USERS: 'users',
  DEVICE_TOKENS: 'device-tokens',
  USER_LOCATIONS: 'user-locations',
} as const;

export const CHAT_TYPE = {
  PRIVATE: 'private',
  GROUP: 'group',
} as const;

export const RESOURCE_EXPIRE_AFTER = {
  AMOUNT: 2,
  UNIT: 'hour',
} as {
  AMOUNT: number;
  UNIT: DurationInputArg2;
};

export const CHAT_BASE_PATH = {
  [CHAT_TYPE.PRIVATE]: 'privates',
  [CHAT_TYPE.GROUP]: 'groups',
  get PRIVATE() {
    return this[CHAT_TYPE.PRIVATE];
  },
  get GROUP() {
    return this[CHAT_TYPE.GROUP];
  },
} as const;

export const EXPIREABLE_RESOURCE = [RESOURCE_NAME.USERS] as const;

export const PREVIEWABLE_MEDIA_MIME = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
} as const;

const ICON_SIZE = 1280;

export const MEDIA_ICON_MAP = {
  [PREVIEWABLE_MEDIA_MIME.AUDIO]: MaterialIcons.getImageSourceSync(
    'audiotrack',
    ICON_SIZE
  ).uri,
  [PREVIEWABLE_MEDIA_MIME.VIDEO]: MaterialIcons.getImageSourceSync(
    'ondemand-video',
    ICON_SIZE
  ).uri,
  document: MaterialIcons.getImageSourceSync('file-copy', ICON_SIZE).uri,
};

export const MEDIA_ICON_MAP_WHITE = {
  [PREVIEWABLE_MEDIA_MIME.AUDIO]: MaterialIcons.getImageSourceSync(
    'audiotrack',
    ICON_SIZE,
    COLOR_PALETTE.WHITE
  ).uri,
  [PREVIEWABLE_MEDIA_MIME.VIDEO]: MaterialIcons.getImageSourceSync(
    'ondemand-video',
    ICON_SIZE,
    COLOR_PALETTE.WHITE
  ).uri,
  document: MaterialIcons.getImageSourceSync(
    'file-copy',
    ICON_SIZE,
    COLOR_PALETTE.WHITE
  ).uri,
};

export const MIN_MEDIA = 1;
export const MAX_MEDIA = 4;
