import { DocumentPickerResponse } from 'react-native-document-picker';
import { AppDispatch } from '..';
import { StoryActionType, StoryReducer } from '../actions-types/story';

export const setStory = (payload: string) => (dispatch: AppDispatch) =>
  dispatch({
    type: StoryActionType.SET_STORY,
    payload,
  });

export const deleteStory = () => (dispatch: AppDispatch) =>
  dispatch({
    type: StoryActionType.DELETE_STORY,
  });

export const setFile =
  (payload: DocumentPickerResponse) => (dispatch: AppDispatch) =>
    dispatch({
      type: StoryActionType.SET_FILE,
      payload,
    });

export const deleteFile = () => (dispatch: AppDispatch) =>
  dispatch({
    type: StoryActionType.DELETE_FILE,
  });

export const setResolution =
  (payload: Partial<StoryReducer['resolution']>) => (dispatch: AppDispatch) =>
    dispatch({
      type: StoryActionType.SET_RESOLUTION,
      payload,
    });

export const deleteResolution = () => (dispatch: AppDispatch) =>
  dispatch({
    type: StoryActionType.DELETE_RESOLUTION,
  });

export const resetStory = () => (dispatch: AppDispatch) =>
  dispatch({
    type: StoryActionType.RESET,
  });
