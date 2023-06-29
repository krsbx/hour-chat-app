import { useMemo } from 'react';
import { CHAT_TYPE } from '../constants/common';
import { sortMessage } from '../utils/chats/common';
import useSingleChatListListener from './useSingleChatListListener';

const useChatListListener = () => {
  const [privateMessages] = useSingleChatListListener(CHAT_TYPE.PRIVATE);
  const [groupMessages] = useSingleChatListListener(CHAT_TYPE.GROUP);

  const messages = useMemo(() => {
    const messages: HourChat.Chat.ChatMessageHistory[] = [
      ...privateMessages,
      ...groupMessages,
    ].sort(sortMessage);

    return messages;
  }, [privateMessages, groupMessages]);

  return messages;
};

export default useChatListListener;
