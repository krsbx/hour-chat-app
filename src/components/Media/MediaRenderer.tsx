import React from 'react';
import { Media } from '..';
import { PREVIEWABLE_MEDIA_MIME } from '../../constants/common';
import { hasOwnProperty } from '../../utils/common';

const MediaRenderer: React.FC<Props> = ({ item, ...props }) => {
  let type = '';

  if (hasOwnProperty<string>(item, 'type'))
    type = (item?.type ?? '').split('/').shift?.() ?? '';

  switch (type) {
    case PREVIEWABLE_MEDIA_MIME.AUDIO:
      return <Media.Audio item={item as never} {...props} />;

    case PREVIEWABLE_MEDIA_MIME.VIDEO:
      return <Media.Video item={item as never} {...props} />;

    default:
      return null;
  }
};

type Props = {
  index: number;
  item: HourChat.Type.ImageSource;
  onRequestClose?: () => void;
  swipeToCloseEnabled?: boolean;
};

export default MediaRenderer;
