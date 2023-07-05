import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Config } from 'react-native-config';
import { useSelector } from 'react-redux';
import { CHAT_TYPE } from '../../constants/common';
import { getConfig } from '../../store/selectors/config';
import { getLastMessageMetadata } from '../../store/selectors/lastMessage';
import useCurrentUser from '../caches/useCurrentUser';

const DEFAULT_LIMIT = 25;

const useChatMessageSubscriber = <
  T extends HourChat.Type.ChatType,
  U extends T extends typeof CHAT_TYPE.PRIVATE
    ? HourChat.Chat.PrivateMetadata[]
    : HourChat.Chat.GroupMetadata[]
>() => {
  const { type, uuid } = useSelector(getConfig);
  const metadata = useSelector(getLastMessageMetadata({ type, uuid }));
  const total = useMemo(() => {
    if (metadata) return metadata.total;

    return DEFAULT_LIMIT;
  }, [metadata]);
  const { user: currentUser } = useCurrentUser();

  const [messages, setMessages] = useState<U>([] as unknown as U);
  const [isMaxReached, setIsMaxReached] = useState(false);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  const subscribePrivateMessages = useCallback(() => {
    const subscribe = firestore()
      .collection(Config.CHAT_PATH)
      .doc('privates')
      .collection('users')
      .doc(`${currentUser.id}`)
      .collection(`${uuid}`)
      .doc('information')
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .limitToLast(limit)
      .onSnapshot((snap) => {
        if (!snap) return;

        const messages = _(snap.docs)
          .map((doc) => {
            const data = doc.data() as U | undefined;

            if (!data) return;

            return _.defaults(data, {
              body: '',
              files: [],
            });
          })
          .compact()
          .value();

        setIsMaxReached(total === limit);
        setMessages(messages as never);
      });

    return subscribe;
  }, [currentUser.id, uuid, total, limit]);

  const subscribeGroupMessages = useCallback(() => {
    const subscribe = firestore()
      .collection(Config.CHAT_PATH)
      .doc('groups')
      .collection('users')
      .doc(`${currentUser.id}`)
      .collection('groups')
      .doc(`${uuid}`)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .limitToLast(limit)
      .onSnapshot((snap) => {
        if (!snap) return;

        const messages = _(snap.docs)
          .map((doc) => doc.data())
          .compact()
          .value();

        setIsMaxReached(total === limit);
        setMessages(messages as U);
      });

    return subscribe;
  }, [currentUser.id, uuid, total, limit]);

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

  const increaseLimit = useCallback(() => {
    if (isMaxReached) return;

    setLimit((limit) => limit + 10);
  }, [setLimit, isMaxReached]);

  useEffect(() => {
    const unsubscribe = subscribeMessages();

    return () => {
      unsubscribe();
    };
  }, [subscribeMessages]);

  return { messages, increaseLimit, isMaxReached };
};

export default useChatMessageSubscriber;
