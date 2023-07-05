import { AppState } from '..';

export const getStories = (state: AppState) => state.stories;

export const getStory =
  (uuid: string, isMyStory: boolean) => (state: AppState) => {
    const stories = getStories(state);

    return stories[isMyStory ? 'user' : 'users'].find(
      (story) => story.uuid === uuid
    );
  };

export const getUserStories = (state: AppState) => state.stories.users;

export const getMyStories = (state: AppState) => state.stories.user;
