import { Image, ScreenWidth } from '@rneui/base';
import React, { useMemo } from 'react';
import { ImageProps, ImageStyle, StyleProp } from 'react-native';
import { scale } from 'react-native-size-matters';
import { MEDIA_ICON_MAP, PREVIEWABLE_MEDIA_MIME } from '../../constants/common';
import { flattenStyle } from '../../styles/factory';

const FileImage: React.FC<Props> = ({ item: _item, ...props }) => {
  const styles = useMemo(() => {
    const styles: StyleProp<ImageStyle>[] = [imageStyle];

    if (props.style) styles.push(props.style);

    return styles;
  }, [props.style]);
  const itemType = useMemo(() => {
    const type = (_item?.type ?? '').split('/').shift?.() ?? '';

    return type;
  }, [_item]);

  const item = useMemo(() => {
    const item = { ..._item };
    switch (itemType) {
      case PREVIEWABLE_MEDIA_MIME.IMAGE:
        break;
      case PREVIEWABLE_MEDIA_MIME.AUDIO:
        item.uri = MEDIA_ICON_MAP.audio;
        break;
      case PREVIEWABLE_MEDIA_MIME.VIDEO:
        item.uri = MEDIA_ICON_MAP.video;
        break;
      default:
        item.uri = MEDIA_ICON_MAP.document;
        break;
    }

    return item;
  }, [_item, itemType]);

  return <Image source={item} {...props} style={styles} />;
};

const imageStyle = flattenStyle({
  width: ScreenWidth * 0.25,
  aspectRatio: 1 / 1,
  borderRadius: scale(5),
  opacity: 0.8,
});

type Props = Omit<ImageProps, 'source'> & {
  item: HourChat.Type.File;
};

export default FileImage;
