import _ from 'lodash';
import { AppState } from '..';

export const getNotification = (state: AppState) => state.notifications;

export const getChatNotification =
  (type: HourChat.Type.ChatType, uuid: string) => (state: AppState) =>
    getNotification(state)?.[type]?.[uuid] ?? 0;

export const getUnreadNotifications = (state: AppState) => {
  const notification = getNotification(state);

  const sumNotification = (value: { [uuid: string]: number }) =>
    _.reduce(value, (prev, curr) => prev + curr, 0);

  return _.reduce(
    notification,
    (prev, curr) => prev + sumNotification(curr),
    0
  );
};
