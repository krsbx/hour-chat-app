import _ from 'lodash';
import React, { useMemo } from 'react';
import { Footer, Header } from '.';
import {
  MEDIA_ICON_MAP_WHITE,
  PREVIEWABLE_MEDIA_MIME,
} from '../constants/common';
import ImageViewing from './ImageViewing';
import MediaRenderer from './Media/MediaRenderer';

const ImageView: React.FC<Props> = ({
  files: _files,
  isVisible,
  fileIndex = 0,
  onRequestClose,
  onIndexChange,
}) => {
  const files = useMemo(() => {
    const files = _.isArray(_files) ? _files : [_files];

    return files.map((file) => {
      const clone: HourChat.Type.FileHref = {
        ...file,
        href: file.uri,
      };
      const type = (clone.type ?? '').split('/').shift?.() ?? '';

      switch (type) {
        case PREVIEWABLE_MEDIA_MIME.IMAGE:
          break;
        case PREVIEWABLE_MEDIA_MIME.AUDIO:
          clone.uri = MEDIA_ICON_MAP_WHITE.audio;
          break;
        case PREVIEWABLE_MEDIA_MIME.VIDEO:
          clone.uri = MEDIA_ICON_MAP_WHITE.video;
          break;
        default:
          clone.uri = MEDIA_ICON_MAP_WHITE.document;
          break;
      }

      return clone;
    });
  }, [_files]);
  const file = useMemo(() => files[fileIndex], [files, fileIndex]);
  const doubleTapToZoomEnabled = useMemo(() => {
    const type = (file?.type ?? '').split('/').shift?.() ?? '';

    return _.includes(PREVIEWABLE_MEDIA_MIME.IMAGE, type);
  }, [file]);

  return (
    <ImageViewing
      items={files}
      viewIndex={fileIndex}
      onIndexChange={onIndexChange}
      visible={isVisible}
      doubleTapToZoomEnabled={doubleTapToZoomEnabled}
      onRequestClose={onRequestClose}
      swipeToCloseEnabled
      HeaderComponent={Header.ImageView as never}
      FooterComponent={Footer.ImageView as never}
      renderItem={MediaRenderer}
    />
  );
};

type Props = {
  files: HourChat.Type.File | HourChat.Type.File[];
  fileIndex?: number;
  onIndexChange?: (fileIndex: number) => void;
  isVisible: boolean;
  onRequestClose: () => void;
};

export default ImageView;
