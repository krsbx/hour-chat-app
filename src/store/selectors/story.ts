import { createSelector } from 'reselect';
import { AppState } from '..';

export const getStory = (state: AppState) => state.story;

export const getFileResolution = createSelector(
  getStory,
  (story) => story.resolution
);

export const getAttachedFile = createSelector(getStory, (story) => story.file);

export const getTypedStory = createSelector(getStory, (story) => story.story);
