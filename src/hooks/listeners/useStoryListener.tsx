import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useMemo } from 'react';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import { StoriesActionType } from '../../store/actions-types/stories';
import { sortStory } from '../../store/reducers/stories';
import { getPrivateLastMessages } from '../../store/selectors/lastMessage';
import useCurrentUser from '../caches/useCurrentUser';

const useStoryListener = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useCurrentUser();
  const privateMessages = useSelector(getPrivateLastMessages);
  const uuids = useMemo(
    () => privateMessages.map(({ uuid }) => uuid),
    [privateMessages]
  );

  const storyListSubscriber = useCallback(
    (uuids: string[], isMyStory: boolean) => {
      const subscribe = firestore()
        .collection(Config.STORY_PATH)
        .doc('story')
        .collection('users')
        .where('userId', 'in', uuids)
        .where('createdAt', '>=', moment().subtract(7, 'day').toDate())
        .where('createdAt', '<=', moment().toDate())
        .onSnapshot((snap) => {
          if (!snap || !snap?.docs) return;

          const docs = _.compact(
            snap.docs.map((doc) => ({
              ...doc.data(),
              uuid: doc.id,
            }))
          ) as HourChat.Story.StoryWithUuid[];

          docs.sort(sortStory);

          dispatch({
            type: isMyStory
              ? StoriesActionType.OVERWRITE_USER
              : StoriesActionType.OVERWRITE_USERS,
            payload: docs,
          });
        });

      return subscribe;
    },
    [dispatch]
  );

  useEffect(() => {
    const unsubscribes: (() => void)[] = [];

    if (currentUser?.id)
      unsubscribes.push(storyListSubscriber([currentUser.id], true));
    if (uuids.length) unsubscribes.push(storyListSubscriber(uuids, false));

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [storyListSubscriber, uuids, currentUser]);
};

export default useStoryListener;
