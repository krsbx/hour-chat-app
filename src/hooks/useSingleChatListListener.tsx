import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Config from 'react-native-config';
import { CHAT_BASE_PATH, CHAT_TYPE } from '../constants/common';
import { sortMessage } from '../utils/chats/common';
import useCurrentUser from './useCurrentUser';

const useSingleChatListListener = <
  T extends HourChat.Type.ChatType,
  U extends T extends typeof CHAT_TYPE.PRIVATE
    ? HourChat.Chat.PrivateMetadata
    : HourChat.Chat.GroupMetadata,
  V extends T extends typeof CHAT_TYPE.PRIVATE
    ? HourChat.Chat.PrivateMessageHistory
    : HourChat.Chat.GroupMessageHistory
>(
  type: T
) => {
  const { user: currentUser } = useCurrentUser();
  const [messagesObj, setMessagesObj] = useState<Record<string, U>>({});
  const [messages, setMessages] = useState<U[]>([] as U[]);
  const basePath = useMemo(() => CHAT_BASE_PATH[type], [type]);

  const chatListSubcriber = useCallback(() => {
    const subscribe = firestore()
      .collection(Config.CHAT_PATH)
      .doc(basePath)
      .collection('users')
      .doc(`${currentUser.id}`)
      .onSnapshot((snap) => {
        if (!snap) return;

        const data = snap.data() as V | undefined;

        if (!data) return;

        const messages = _.reduce(
          data,
          (prev, curr) => {
            prev.push(
              _.defaults(curr, {
                body: '',
                files: [],
                total: 0,
              }) as unknown as U
            );

            return prev;
          },
          [] as U[]
        ).sort(sortMessage);

        setMessagesObj(_.keyBy(messages, 'uuid'));
        setMessages(messages);
      });

    return subscribe;
  }, [basePath, currentUser.id]);

  useEffect(() => {
    const unsubscribe = chatListSubcriber();

    return () => {
      unsubscribe();
    };
  }, [chatListSubcriber]);

  return [messages, messagesObj] as const;
};

export default useSingleChatListListener;
