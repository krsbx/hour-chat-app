import { useMemo } from 'react';
import { CHAT_TYPE } from '../constants/common';
import { CHAT_STACK } from '../constants/screens';
import useCurrentUser from './useCurrentUser';

const useChatDecryptionPayload = ({ type, uuid }: Props) => {
  const { user: currentUser } = useCurrentUser();

  const payload = useMemo(() => {
    const payload = {
      senderId: '' as number | string,
      receiverId: '' as number | string,
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

type Props = HourChat.Navigation.ChatStackProps<
  typeof CHAT_STACK.VIEW
>['route']['params'];

export default useChatDecryptionPayload;
