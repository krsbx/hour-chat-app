import { AppDispatch } from '..';
import { LastMessageActionType } from '../actions-types/lastMessage';

export const setPrivateLastMessages =
  (payload: HourChat.Chat.PrivateMetadata[]) => (dispatch: AppDispatch) =>
    dispatch({
      type: LastMessageActionType.SET_PRIVATES,
      payload,
    });

export const setGroupLastMessages =
  (payload: HourChat.Chat.GroupMetadata[]) => (dispatch: AppDispatch) =>
    dispatch({
      type: LastMessageActionType.SET_GROUPS,
      payload,
    });
