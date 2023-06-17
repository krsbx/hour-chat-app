import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import _ from 'lodash';
import moment from 'moment';
import { useCallback, useEffect, useMemo } from 'react';
import Config from 'react-native-config';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { StoriesActionType } from '../store/actions-types/stories';
import useCurrentUser from './useCurrentUser';

const useUserStoryListener = (_uids?: number[]) => {
  const isOnFocus = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useCurrentUser();

  const uids = useMemo(() => {
    if (_uids && _uids.length) return _uids;

    return [currentUser.id];
  }, [_uids, currentUser.id]);

  const storyListSubscriber = useCallback(() => {
    const subscribe = firestore()
      .collection(Config.STORY_PATH)
      .doc('story')
      .collection('users')
      .where('userId', 'in', uids)
      .where('timestamp', '>', moment().subtract(1, 'day').toDate())
      .onSnapshot((snap) => {
        if (!snap?.docs) return;

        const docs = _.compact(
          snap.docs.map((doc) => ({
            ...doc.data(),
            uuid: doc.id,
          }))
        ) as HourChat.Story.StoryWithUuid[];

        docs.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());

        dispatch({
          type: StoriesActionType.OVERWRITE,
          payload: docs,
        });
      });

    return subscribe;
  }, [uids, dispatch]);

  useEffect(() => {
    const unsubscribe = storyListSubscriber();

    return () => {
      unsubscribe();
    };
  }, [storyListSubscriber, isOnFocus]);
};

export default useUserStoryListener;
