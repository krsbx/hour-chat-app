import React from 'react';
import { CHAT_TYPE } from '../../constants/common';
import Message from './Message';

const GroupMessage: React.FC<Props> = (props) => {
  return <Message type={CHAT_TYPE.GROUP} {...props} />;
};

type Props = HourChat.Chat.GroupMetadata;

export default GroupMessage;
