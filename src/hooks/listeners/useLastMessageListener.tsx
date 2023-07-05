import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import Config from 'react-native-config';
import { useDispatch } from 'react-redux';
import { CHAT_BASE_PATH, CHAT_TYPE } from '../../constants/common';
import {
  setGroupLastMessages,
  setPrivateLastMessages,
} from '../../store/actions/lastMessage';
import { sortMessage } from '../../utils/chats/common';
import useCurrentUser from '../caches/useCurrentUser';

const useLastMessageListener = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useCurrentUser();

  const chatListSubcriber = useCallback(
    <
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
      const subscribe = firestore()
        .collection(Config.CHAT_PATH)
        .doc(CHAT_BASE_PATH[type])
        .collection('users')
        .doc(currentUser.id)
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

          switch (type) {
            case CHAT_TYPE.PRIVATE:
              setPrivateLastMessages(messages as never)(dispatch);
              break;
            case CHAT_TYPE.GROUP:
              setGroupLastMessages(messages as never)(dispatch);
              break;
          }
        });

      return subscribe;
    },
    [currentUser.id, dispatch]
  );

  useEffect(() => {
    const unsubscribes = [
      chatListSubcriber(CHAT_TYPE.PRIVATE),
      chatListSubcriber(CHAT_TYPE.GROUP),
    ];

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [chatListSubcriber]);
};

export default useLastMessageListener;
