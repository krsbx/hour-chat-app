import { AppState } from '..';

export const getFileResolution = (state: AppState) => state.story.resolution;

export const getAttachedFile = (state: AppState) => state.story.file;

export const getTypedStory = (state: AppState) => state.story.story;
