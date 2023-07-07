import { Text } from '@rneui/base';
import React, { useMemo } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import useTextDecryptor from '../../hooks/chats/useTextDecryptor';
import { COLOR_PALETTE } from '../../utils/theme';

const MessageBody: React.FC<Props> = ({ body, incoming, fromQueue }) => {
  const messageBody = useTextDecryptor(body);

  const messageStyle = useMemo(() => {
    const styles: StyleProp<TextStyle>[] = [
      {
        fontSize: scale(10),
      },
    ];

    styles.push({
      color: incoming ? COLOR_PALETTE.NEUTRAL_100 : COLOR_PALETTE.WHITE,
    });

    return styles;
  }, [incoming]);

  if (fromQueue) return <Text style={messageStyle}>{body}</Text>;

  if (!messageBody) return null;

  return <Text style={messageStyle}>{messageBody}</Text>;
};

type Props = {
  body: string;
  incoming?: boolean;
  fromQueue?: boolean;
};

export default MessageBody;
