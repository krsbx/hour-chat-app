import React from 'react';
import { CHAT_TYPE } from '../../constants/common';
import useCachedUserData from '../../hooks/useCachedUserData';
import Message from './Message';

const PrivateMessage: React.FC<Props> = ({ uuid, body, timestamp }) => {
  const { fullName, user } = useCachedUserData(uuid);

  if (!user) return null;

  return (
    <Message
      name={fullName}
      body={body}
      timestamp={timestamp}
      type={CHAT_TYPE.PRIVATE}
      user={user}
      uuid={uuid}
    />
  );
};

type Props = HourChat.Chat.PrivateMetadata;

export default PrivateMessage;
