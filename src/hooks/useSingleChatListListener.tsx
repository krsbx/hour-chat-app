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
  const [messages, setMessages] = useState<U[]>([] as U[]);
  const basePath = useMemo(() => CHAT_BASE_PATH[type], [type]);

  const chatListSubcriber = useCallback(() => {
    const subscribe = firestore()
      .collection(Config.CHAT_PATH)
      .doc(basePath)
      .collection('users')
      .doc(`${currentUser.id}`)
      .onSnapshot((snap) => {
        const data = snap.data() as V | undefined;

        if (!data) return;

        const messages = _.reduce(
          data,
          (prev, curr) => {
            prev.push(curr as U);

            return prev;
          },
          [] as U[]
        ).sort(sortMessage);

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

  return messages;
};

export default useSingleChatListListener;
