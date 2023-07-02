import _ from 'lodash';
import { PREVIEWABLE_MEDIA_MIME } from '../../constants/common';
import { decryptText } from './encryption';

export const isMediaPreviewable = (file: HourChat.Type.File) => {
  const type = (file.type ?? '').split('/').shift() ?? '';

  return _.includes(
    [
      PREVIEWABLE_MEDIA_MIME.IMAGE,
      PREVIEWABLE_MEDIA_MIME.VIDEO,
      PREVIEWABLE_MEDIA_MIME.AUDIO,
    ],
    type
  );
};

export const decryptFile = (
  file: HourChat.Type.File,
  config: HourChat.Type.Encryption
) => ({
  ...file,
  uri: decryptText(file.uri, config) ?? '',
});

export const decryptFiles = (
  file: HourChat.Type.File | HourChat.Type.File[],
  config: HourChat.Type.Encryption
) => {
  const files = _.isArray(file) ? file : [file];

  return files.map((file) => decryptFile(file, config));
};
