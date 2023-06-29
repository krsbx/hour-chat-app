import { store } from '..';
import axios from '../axios';
import { getAuth } from '../selectors/auth';

export const sendPrivateMessage =
  ({ body, receiverId }: { body: string; receiverId: string }) =>
  async () => {
    const { id } = getAuth(store.getState());

    axios.post('/chats/private/send', {
      body,
      receiverId,
      senderId: id,
    });
  };

export const sendGroupMessage =
  ({ body, uuid }: { body: string; uuid: string }) =>
  async () => {
    const { id } = getAuth(store.getState());

    axios.post('/chats/group/send', {
      body,
      uuid,
      senderId: id,
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
