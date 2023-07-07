import _ from 'lodash';
import { createSelector } from 'reselect';
import { AppState } from '..';
import { CHAT_TYPE } from '../../constants/common';

export const getNotification = (state: AppState) => state.notifications;

export const getPrivateNotification = createSelector(
  getNotification,
  (notifications) => notifications.private
);

export const getGroupNotification = createSelector(
  getNotification,
  (notifications) => notifications.group
);

export const getChatNotification = (
  type: HourChat.Type.ChatType,
  uuid: string
) =>
  createSelector(
    getPrivateNotification,
    getGroupNotification,
    (privates, groups) => {
      switch (type) {
        case CHAT_TYPE.PRIVATE:
          return privates?.[uuid] ?? 0;

        case CHAT_TYPE.GROUP:
          return groups?.[uuid] ?? 0;
      }
    }
  );

export const getUnreadNotifications = createSelector(
  getPrivateNotification,
  getGroupNotification,
  (privates, groups) => {
    const sumNotification = (value: { [uuid: string]: number }) =>
      _.reduce(value, (prev, curr) => prev + curr, 0);

    return _.reduce(
      [privates, groups],
      (prev, curr) => prev + sumNotification(curr),
      0
    );
  }
);
