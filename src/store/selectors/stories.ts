import { createSelector } from 'reselect';
import { AppState } from '..';

export const getStories = (state: AppState) => state.stories;

export const getUserStories = createSelector(
  getStories,
  (stories) => stories.users
);

export const getMyStories = createSelector(
  getStories,
  (stories) => stories.user
);

export const getStory = (uuid: string, isMyStory: boolean) =>
  createSelector(getUserStories, getMyStories, (userStories, myStories) =>
    (isMyStory ? myStories : userStories).find((story) => story.uuid === uuid)
  );
