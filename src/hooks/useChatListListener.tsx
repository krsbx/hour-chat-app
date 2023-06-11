import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Config from 'react-native-config';
import useCurrentUser from './useCurrentUser';

const sortMessage = (
  a: HourChat.Chat.ChatMessageHistory,
  b: HourChat.Chat.ChatMessageHistory
) => b.timestamp.toMillis() - a.timestamp.toMillis();

const useChatListListener = () => {
  const { user: currentUser } = useCurrentUser();
  const [privateMessages, setPrivateMessages] = useState<
    HourChat.Chat.PrivateMetadata[]
  >([]);
  const [groupMessages, setGroupMessages] = useState<
    HourChat.Chat.GroupMetadata[]
  >([]);

  const messages = useMemo(() => {
    const messages: HourChat.Chat.ChatMessageHistory[] = [
      ...privateMessages,
      ...groupMessages,
    ].sort(sortMessage);

    return messages;
  }, [privateMessages, groupMessages]);

  const privateChatSubscriber = useCallback(() => {
    const subscribe = firestore()
      .collection(Config.CHAT_PATH)
      .doc('privates')
      .collection('users')
      .doc(`${currentUser.id}`)
      .onSnapshot(async (snap) => {
        const data: HourChat.Chat.PrivateMessageHistory | undefined =
          snap.data();

        if (!data) return;

        const messages = _.reduce(
          data,
          (prev, curr) => {
            prev.push(curr);

            return prev;
          },
          [] as HourChat.Chat.PrivateMetadata[]
        ).sort(sortMessage);

        setPrivateMessages(messages);
      });

    return subscribe;
  }, [currentUser.id]);

  const groupChatSubscriber = useCallback(() => {
    const subscribe = firestore()
      .collection(Config.CHAT_PATH)
      .doc('groups')
      .collection('users')
      .doc(`${currentUser.id}`)
      .onSnapshot((snap) => {
        const data: HourChat.Chat.GroupMessageHistory | undefined = snap.data();

        if (!data) return;

        const messages = _.reduce(
          data,
          (prev, curr) => {
            prev.push(curr);

            return prev;
          },
          [] as HourChat.Chat.GroupMetadata[]
        ).sort(sortMessage);

        setGroupMessages(messages);
      });

    return subscribe;
  }, [currentUser.id]);

  useEffect(() => {
    const unsubscribes = [privateChatSubscriber(), groupChatSubscriber()];

    return () => {
      unsubscribes.map((unsubscribe) => unsubscribe());
    };
  }, [privateChatSubscriber, groupChatSubscriber]);

  return messages;
};

export default useChatListListener;
