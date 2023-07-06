import { AppState } from '..';
import { CHAT_TYPE } from '../../constants/common';
import { sortMessage } from '../../utils/chats/common';

export const getPrivateLastMessages = (state: AppState) =>
  state.lastMessage.privates;

export const getPrivateLastMessage =
  (receiverId: string) => (state: AppState) =>
    state.lastMessage.privates.find(({ uuid }) => uuid === receiverId);

export const getGroupLastMessages = (state: AppState) =>
  state.lastMessage.groups;

export const getGroupLastMessage = (uuid: string) => (state: AppState) =>
  state.lastMessage.groups.find((group) => group.uuid === uuid);

export const getLastMessages = (state: AppState) =>
  [...getPrivateLastMessages(state), ...getGroupLastMessages(state)].sort(
    sortMessage
  );

export const getLastMessageMetadata =
  <
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
  (state: AppState): U | undefined => {
    switch (type) {
      case CHAT_TYPE.PRIVATE:
        return getPrivateLastMessage(uuid)(state) as U | undefined;

      case CHAT_TYPE.GROUP:
        return getGroupLastMessage(uuid)(state) as U | undefined;

      default:
        return;
    }
  };
