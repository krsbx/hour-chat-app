import { Image, ScreenWidth } from '@rneui/base';
import React, { useMemo } from 'react';
import { ImageProps, ImageStyle, StyleProp } from 'react-native';
import { scale } from 'react-native-size-matters';
import { flattenStyle } from '../../styles/factory';

const FileImage: React.FC<Props> = ({ file, ...props }) => {
  const styles = useMemo(() => {
    const styles: StyleProp<ImageStyle>[] = [imageStyle];

    if (props.style) styles.push(props.style);

    return styles;
  }, [props.style]);

  return <Image source={file} {...props} style={styles} />;
};

const imageStyle = flattenStyle({
  width: ScreenWidth * 0.25,
  aspectRatio: 1 / 1,
  borderRadius: scale(5),
  opacity: 0.9,
});

type Props = Omit<ImageProps, 'source'> & {
  file: HourChat.Type.File;
};

export default FileImage;
