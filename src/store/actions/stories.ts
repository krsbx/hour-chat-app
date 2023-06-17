import _ from 'lodash';
import { AppDispatch, store } from '..';
import { StoriesActionType } from '../actions-types/stories';
import axios from '../axios';
import { getAuth } from '../selectors/auth';
import { getStory } from '../selectors/stories';
import { resetStory } from './story';

export const createStory =
  (payload: HourChat.Story.BaseStory) => async (dispatch: AppDispatch) => {
    if (payload.body) payload.body = payload.body.trim();

    await axios.post('/stories', payload);

    resetStory()(dispatch);
  };

export const likeStory = (uuid: string) => (dispatch: AppDispatch) => {
  const { id } = getAuth(store.getState());
  const stories = getStory(uuid)(store.getState());

  dispatch({
    type: StoriesActionType.UPDATE,
    payload: {
      uuid: uuid,
      likes: _.uniq([...(stories?.likes ?? []), id]),
      dislikes: _.filter(
        [...(stories?.dislikes ?? [])],
        (userId) => userId !== id
      ),
    },
  });

  axios.post(`/stories/${uuid}/like`).catch(() => {
    // Do nothing if there is an error
  });
};

export const dislikeStory = (uuid: string) => (dispatch: AppDispatch) => {
  const { id } = getAuth(store.getState());
  const stories = getStory(uuid)(store.getState());

  dispatch({
    type: StoriesActionType.UPDATE,
    payload: {
      uuid: uuid,
      likes: _.filter([...(stories?.likes ?? [])], (userId) => userId !== id),
      dislikes: _.uniq([...(stories?.dislikes ?? []), id]),
    },
  });

  axios.post(`/stories/${uuid}/dislike`).catch(() => {
    // Do nothing if there is an error
  });
};
