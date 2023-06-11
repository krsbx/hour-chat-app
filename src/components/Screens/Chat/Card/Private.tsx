import React from 'react';
import { CHAT_TYPE } from '../../../../constants/common';
import useCachedUserData from '../../../../hooks/useCachedUserData';
import Message from './Message';

const Private: React.FC<Props> = ({ uuid, body, timestamp }) => {
  const { fullName, user } = useCachedUserData(uuid);

  if (!user) return null;

  return (
    <Message
      name={fullName}
      body={body}
      timestamp={timestamp}
      type={CHAT_TYPE.PRIVATE}
      uuid={uuid}
    />
  );
};

type Props = HourChat.Chat.PrivateMetadata;

export default Private;
