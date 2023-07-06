import { AppDispatch } from '..';
import {
  CurrentChatActionType,
  CurrentChatReducer,
} from '../actions-types/currentChat';

export const setCurrentChat =
  (payload: Partial<CurrentChatReducer>) => (dispatch: AppDispatch) =>
    dispatch({
      type: CurrentChatActionType.SET,
      payload,
    });

export const deleteCurrentChat = () => (dispatch: AppDispatch) =>
  dispatch({
    type: CurrentChatActionType.DELETE,
  });
