import React from 'react';
import { CHAT_TYPE } from '../../constants/common';
import Message from './Message';

const GroupMessage: React.FC<Props> = ({ name, body, timestamp, uuid }) => {
  return (
    <Message
      name={name}
      body={body}
      timestamp={timestamp}
      type={CHAT_TYPE.GROUP}
      uuid={uuid}
    />
  );
};

type Props = HourChat.Chat.GroupMetadata;

export default GroupMessage;
