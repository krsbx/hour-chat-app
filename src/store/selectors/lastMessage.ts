import { createSelector } from 'reselect';
import { AppState } from '..';
import { CHAT_TYPE } from '../../constants/common';
import { sortMessage } from '../../utils/chats/common';

export const getLastMessage = (state: AppState) => state.lastMessage;

export const getPrivateLastMessages = createSelector(
  getLastMessage,
  (lastMessage) => lastMessage.privates
);

export const getPrivateLastMessage = (receiverId: string) =>
  createSelector(getPrivateLastMessages, (lastMessages) =>
    lastMessages.find(({ uuid }) => uuid === receiverId)
  );

export const getGroupLastMessages = createSelector(
  getLastMessage,
  (lastMessage) => lastMessage.groups
);

export const getGroupLastMessage = (uuid: string) =>
  createSelector(getGroupLastMessages, (lastMessages) =>
    lastMessages.find((group) => group.uuid === uuid)
  );

export const getLastMessages = createSelector(
  getPrivateLastMessages,
  getGroupLastMessages,
  (privates, groups) => [...privates, ...groups].sort(sortMessage)
);

export const getLastMessageMetadata = <
  T extends HourChat.Type.ChatType,
  U extends T extends typeof CHAT_TYPE.PRIVATE
    ? HourChat.Chat.PrivateMetadata
    : HourChat.Chat.GroupMetadata
>({
  type,
  uuid,
}: {
  type: T;
  uuid: string;
}) =>
  createSelector(
    getPrivateLastMessage(uuid),
    getGroupLastMessage(uuid),
    (privateMessage, groupMessage) => {
      switch (type) {
        case CHAT_TYPE.PRIVATE:
          return privateMessage as U | undefined;

        case CHAT_TYPE.GROUP:
          return groupMessage as U | undefined;

        default:
          return;
      }
    }
  );
