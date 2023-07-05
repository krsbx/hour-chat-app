import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CHAT_TYPE } from '../../constants/common';
import { getConfig } from '../../store/selectors/config';
import useCurrentUser from '../caches/useCurrentUser';

const useChatEncryptionPayload = () => {
  const { type, uuid } = useSelector(getConfig);
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

export default useChatEncryptionPayload;
