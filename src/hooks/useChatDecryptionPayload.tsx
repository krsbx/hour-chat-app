import { useMemo } from 'react';
import { CHAT_TYPE } from '../constants/common';
import useCurrentUser from './useCurrentUser';

const useChatDecryptionPayload = ({ type, uuid }: Params) => {
  const { user: currentUser } = useCurrentUser();

  const payload = useMemo(() => {
    const payload = {
      senderId: '',
      receiverId: '',
      type: type,
    };

    switch (type) {
      case CHAT_TYPE.GROUP:
        payload.senderId = uuid;
        payload.receiverId = uuid;
        break;

      case CHAT_TYPE.PRIVATE: {
        payload.senderId = currentUser.id;
        payload.receiverId = uuid;
        break;
      }

      default:
        break;
    }

    return payload;
  }, [currentUser.id, type, uuid]);

  return payload;
};

type Params = {
  type: HourChat.Type.ChatType;
  uuid: string;
};

export default useChatDecryptionPayload;
