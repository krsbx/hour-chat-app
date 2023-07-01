import { Image, ScreenWidth } from '@rneui/base';
import React, { useMemo } from 'react';
import { ImageProps, ImageStyle, StyleProp } from 'react-native';
import { scale } from 'react-native-size-matters';
import { MEDIA_ICON_MAP, PREVIEWABLE_MEDIA_MIME } from '../../constants/common';
import { flattenStyle } from '../../styles/factory';

const FileImage: React.FC<Props> = ({ file: _file, ...props }) => {
  const styles = useMemo(() => {
    const styles: StyleProp<ImageStyle>[] = [imageStyle];

    if (props.style) styles.push(props.style);

    return styles;
  }, [props.style]);
  const fileType = useMemo(() => {
    const type = (_file.type ?? '').split('/').shift?.() ?? '';

    return type;
  }, [_file]);

  const file = useMemo(() => {
    const file = { ..._file };
    switch (fileType) {
      case PREVIEWABLE_MEDIA_MIME.IMAGE:
        break;
      case PREVIEWABLE_MEDIA_MIME.AUDIO:
        file.uri = MEDIA_ICON_MAP.audio;
        break;
      case PREVIEWABLE_MEDIA_MIME.VIDEO:
        file.uri = MEDIA_ICON_MAP.video;
        break;
      default:
        file.uri = MEDIA_ICON_MAP.document;
        break;
    }

    return file;
  }, [_file, fileType]);

  return <Image source={file} {...props} style={styles} />;
};

const imageStyle = flattenStyle({
  width: ScreenWidth * 0.25,
  aspectRatio: 1 / 1,
  borderRadius: scale(5),
  opacity: 0.8,
});

type Props = Omit<ImageProps, 'source'> & {
  file: HourChat.Type.File;
};

export default FileImage;
