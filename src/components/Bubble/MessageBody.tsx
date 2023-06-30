import { Text } from '@rneui/base';
import React, { useMemo } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import useDecryptedChatMessage from '../../hooks/useDecryptedChatMessage';
import { COLOR_PALETTE } from '../../utils/theme';

const MessageBody: React.FC<Props> = ({ body, config, incoming }) => {
  const messageBody = useDecryptedChatMessage(body, config);

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

  if (!messageBody) return null;

  return <Text style={messageStyle}>{messageBody}</Text>;
};

type Props = {
  body: string;
  config: HourChat.Type.Encryption;
  incoming?: boolean;
};

export default MessageBody;
