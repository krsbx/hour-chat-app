import { CHAT_TYPE } from '../../constants/common';

export type NotificationReducer = {
  [CHAT_TYPE.PRIVATE]: {
    [uuid: string]: number;
  };
  [CHAT_TYPE.GROUP]: {
    [uuid: string]: number;
  };
};

export type NotificationPayload = {
  type: HourChat.Type.ChatType;
  uuid: string;
};

export enum NotificationActionType {
  INCREMENT = 'notifications.increment',
  DECREMENT = 'notifications.decrement',
  SET = 'notifications.set',
}

export type IncreaseNotification = {
  type: NotificationActionType.INCREMENT;
  payload: NotificationPayload;
};

export type DecreaseNotification = {
  type: NotificationActionType.DECREMENT;
  payload: NotificationPayload;
};

export type SetNotification = {
  type: NotificationActionType.SET;
  payload: NotificationPayload & {
    value: number;
  };
};
