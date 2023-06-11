import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Config } from 'react-native-config';
import { CHAT_TYPE } from '../constants/common';
import useCurrentUser from './useCurrentUser';

const useChatMessageSubscriber = <
  T extends HourChat.Type.ChatType,
  U extends T extends typeof CHAT_TYPE.PRIVATE
    ? HourChat.Chat.PrivateMetadata[]
    : HourChat.Chat.GroupMetadata[]
>(
  type: T,
  uid: string | number
): U => {
  const { user: currentUser } = useCurrentUser();
  const [messages, setMessages] = useState<U>([] as unknown as U);

  const subscribePrivateMessages = useCallback(() => {
    const subscribe = firestore()
      .collection(Config.CHAT_PATH)
      .doc('privates')
      .collection('users')
      .doc(`${currentUser.id}`)
      .collection(`${uid}`)
      .doc('information')
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snap) => {
        const messages = _(snap.docs)
          .map((doc) => doc.data())
          .compact()
          .value();

        setMessages(messages as U);
      });

    return subscribe;
  }, [currentUser.id, uid]);

  const subscribeGroupMessages = useCallback(() => {
    const subscribe = firestore()
      .collection(Config.CHAT_PATH)
      .doc('groups')
      .collection('users')
      .doc(`${currentUser.id}`)
      .collection('groups')
      .doc(`${uid}`)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snap) => {
        const messages = _(snap.docs)
          .map((doc) => doc.data())
          .compact()
          .value();

        setMessages(messages as U);
      });

    return subscribe;
  }, [currentUser.id, uid]);

  const subscribeMessages = useCallback(() => {
    switch (type) {
      case CHAT_TYPE.PRIVATE:
        return subscribePrivateMessages();

      case CHAT_TYPE.GROUP:
        return subscribeGroupMessages();

      default:
        return () => {};
    }
  }, [type, subscribeGroupMessages, subscribePrivateMessages]);

  useEffect(() => {
    const unsubscribe = subscribeMessages();

    return () => {
      unsubscribe();
    };
  }, [subscribeMessages]);

  return messages;
};

export default useChatMessageSubscriber;
