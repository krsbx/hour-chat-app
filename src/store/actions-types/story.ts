import { DocumentPickerResponse } from 'react-native-document-picker';

export type StoryReducer = {
  story: string;
  file: DocumentPickerResponse;
  resolution: {
    width: number;
    height: number;
  };
};

export enum StoryActionType {
  SET_STORY = 'story.story.set',
  DELETE_STORY = 'story.story.delete',
  RESET = 'story.all.reset',
  SET_FILE = 'story.file.set',
  DELETE_FILE = 'story.file.delete',
  SET_RESOLUTION = 'story.resolution.set',
  DELETE_RESOLUTION = 'story.resolution.delete',
}

export type SetStory = {
  type: StoryActionType.SET_STORY;
  payload: string;
};

export type DeleteStory = {
  type: StoryActionType.DELETE_STORY;
};

export type ResetStory = {
  type: StoryActionType.RESET;
};

export type SetFile = {
  type: StoryActionType.SET_FILE;
  payload: DocumentPickerResponse;
};

export type DeleteFile = {
  type: StoryActionType.DELETE_FILE;
};

export type SetResolution = {
  type: StoryActionType.SET_RESOLUTION;
  payload: Partial<StoryReducer['resolution']>;
};

export type DeleteResolution = {
  type: StoryActionType.DELETE_RESOLUTION;
};
