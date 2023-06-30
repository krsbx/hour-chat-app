import { Text } from '@rneui/base';
import _ from 'lodash';
import React, { useMemo } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLOR_PALETTE } from '../../utils/theme';

const FileMessage: React.FC<Props> = ({ files, incoming }) => {
  const buttonStyle = useMemo(() => {
    const styles: StyleProp<ViewStyle>[] = [
      {
        paddingHorizontal: scale(5),
        paddingVertical: scale(2.5),
        borderRadius: scale(10),
        marginVertical: scale(2),
      },
    ];

    styles.push({
      backgroundColor: incoming
        ? COLOR_PALETTE.BLUE_10
        : COLOR_PALETTE.NEUTRAL_30,
    });

    return styles;
  }, [incoming]);

  const textStyle = useMemo(() => {
    const styles: StyleProp<TextStyle>[] = [
      {
        fontSize: scale(10),
      },
    ];

    styles.push({
      color: incoming ? COLOR_PALETTE.WHITE : COLOR_PALETTE.NEUTRAL_100,
    });

    return styles;
  }, [incoming]);

  if (_.isEmpty(files)) return null;

  return (
    <TouchableOpacity style={buttonStyle}>
      <Text style={textStyle}>
        {files.length > 9 ? '9+' : files.length} Files
      </Text>
    </TouchableOpacity>
  );
};

type Props = {
  files: HourChat.Type.File[];
  incoming?: boolean;
};

export default FileMessage;
