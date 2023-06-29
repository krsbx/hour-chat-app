import type { Timestamp } from '@firebase/firestore';
import moment from 'moment';
import { useMemo } from 'react';
import { hasOwnProperty } from '../utils/common';
import useSingleChatListListener from './useSingleChatListListener';

const useLastMessageListener = ({
  type,
  uuid,
}: {
  type: HourChat.Type.ChatType;
  uuid: string;
}) => {
  const [, messages] = useSingleChatListListener(type);
  const message = useMemo(() => {
    const obj = {
      body: '',
      name: '',
      senderId: '',
      timestamp: moment() as unknown as Timestamp,
      uuid: '',
      total: 0,
    };

    if (!messages?.length) return obj;

    const message = messages[uuid];
    if (!message) return obj;

    obj.body = message.body;
    obj.senderId = message.senderId;
    obj.timestamp = message.timestamp;
    obj.uuid = message.uuid;

    if (hasOwnProperty<string>(message, 'name')) obj.name = message.name;
    if (hasOwnProperty<number>(message, 'total')) obj.total = message.total;

    return obj;
  }, [messages, uuid]);

  return message;
};

export default useLastMessageListener;
