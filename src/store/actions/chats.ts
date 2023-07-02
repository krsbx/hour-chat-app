import { store } from '..';
import axios from '../axios';
import { getAuth } from '../selectors/auth';

export const sendPrivateMessage =
  ({ body, receiverId, files }: HourChat.Chat.PrivateChatPayload) =>
  async () => {
    const { id } = getAuth(store.getState());

    axios.post('/chats/private/send', {
      body,
      receiverId,
      senderId: id,
      files,
    });
  };

export const sendGroupMessage =
  ({ body, uuid, files }: HourChat.Chat.GroupChatPayload) =>
  async () => {
    const { id } = getAuth(store.getState());

    axios.post('/chats/group/send', {
      body,
      uuid,
      senderId: id,
      files,
    });
  };

export const setTypingPrivateMessage =
  ({ receiverId, typing }: { receiverId: string; typing: boolean }) =>
  async () => {
    const { id } = getAuth(store.getState());

    axios.post('/chats/private/typing', {
      senderId: id,
      receiverId,
      typing,
    });
  };

export const setTypingGroupMessage =
  ({ uuid, typing }: { uuid: string; typing: boolean }) =>
  async () => {
    const { id } = getAuth(store.getState());

    axios.post('/chats/group/typing', {
      senderId: id,
      uuid,
      typing,
    });
  };
