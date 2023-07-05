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
  ({ type, uuid }: { type: HourChat.Type.ChatType; uuid: string }) =>
  (
    state: AppState
  ):
    | HourChat.Chat.PrivateMetadata
    | HourChat.Chat.GroupMetadata
    | undefined => {
    switch (type) {
      case CHAT_TYPE.PRIVATE:
        return getPrivateLastMessage(uuid)(state);

      case CHAT_TYPE.GROUP:
        return getGroupLastMessage(uuid)(state);

      default:
        return;
    }
  };
