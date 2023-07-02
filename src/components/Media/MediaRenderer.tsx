import React from 'react';
import { PREVIEWABLE_MEDIA_MIME } from '../../constants/common';
import { hasOwnProperty } from '../../utils/common';
import FileAudio from './FileAudio';
import FileVideo from './FileVideo';

const MediaRenderer: React.FC<Props> = ({ item, ...props }) => {
  let type = '';

  if (hasOwnProperty<string>(item, 'type'))
    type = (item?.type ?? '').split('/').shift?.() ?? '';

  switch (type) {
    case PREVIEWABLE_MEDIA_MIME.IMAGE:
      return null;

    case PREVIEWABLE_MEDIA_MIME.AUDIO:
      return <FileAudio item={item} {...props} />;

    case PREVIEWABLE_MEDIA_MIME.VIDEO:
      return <FileVideo item={item as never} {...props} />;

    default:
      return null;
  }
};

type Props = {
  item: HourChat.Type.ImageSource;
  onRequestClose?: () => void;
  swipeToCloseEnabled?: boolean;
};

export default MediaRenderer;
