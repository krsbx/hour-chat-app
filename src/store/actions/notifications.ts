import { AppDispatch } from '..';
import {
  NotificationActionType,
  NotificationPayload,
} from '../actions-types/notifications';

export const setNotification =
  (
    payload: NotificationPayload & {
      value: number;
    }
  ) =>
  (dispatch: AppDispatch) =>
    dispatch({
      type: NotificationActionType.SET,
      payload,
    });

export const incrementNotification =
  (payload: NotificationPayload) => (dispatch: AppDispatch) =>
    dispatch({
      type: NotificationActionType.INCREMENT,
      payload,
    });

export const decrementNotification =
  (payload: NotificationPayload) => (dispatch: AppDispatch) =>
    dispatch({
      type: NotificationActionType.DECREMENT,
      payload,
    });
