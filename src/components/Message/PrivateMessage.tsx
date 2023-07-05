import React from 'react';
import { CHAT_TYPE } from '../../constants/common';
import useCachedUserData from '../../hooks/caches/useCachedUserData';
import Message from './Message';

const PrivateMessage: React.FC<Props> = ({ uuid, ...props }) => {
  const { fullName, user } = useCachedUserData(uuid);

  if (!user) return null;

  return (
    <Message
      name={fullName}
      type={CHAT_TYPE.PRIVATE}
      user={user}
      uuid={uuid}
      {...props}
    />
  );
};

type Props = HourChat.Chat.PrivateMetadata;

export default PrivateMessage;
