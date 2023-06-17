import { AppState } from '..';

export const getStories = (state: AppState) => state.stories;

export const getStory = (uuid: string) => (state: AppState) => {
  const stories = getStories(state);

  return stories.find((story) => story.uuid === uuid);
};
