import { useMemo } from 'react';
import { sortMessage } from '../../utils/chats/common';
import useChatMessageSubscriber from './useChatMessageSubscriber';
import useQueuedMessage from './useQueuedMessage';

const useChatMessages = () => {
  const { messages, increaseLimit, isMaxReached } = useChatMessageSubscriber();
  const queuedMessages = useQueuedMessage();

  const joinedMessages = useMemo(() => {
    const joinedMessages: (
      | HourChat.Chat.PrivateMetadata
      | HourChat.Chat.GroupMetadata
    )[] = [];

    if (messages.length) {
      joinedMessages.push(...(messages as never[]));
    }

    if (queuedMessages.length) {
      joinedMessages.push(
        ...queuedMessages.map(
          (message) =>
            ({
              ...message,
              fromQueue: true,
            } as never)
        )
      );
    }

    joinedMessages.sort(sortMessage);

    return joinedMessages;
  }, [messages, queuedMessages]);

  return { messages: joinedMessages, increaseLimit, isMaxReached };
};

export default useChatMessages;
