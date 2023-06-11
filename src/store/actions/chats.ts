import { store } from '..';
import axios from '../axios';
import { getAuth } from '../selectors/auth';

export const sendPrivateMessage =
  ({ body, receiverId }: { body: string; receiverId: string | number }) =>
  async () => {
    const { id } = getAuth(store.getState());

    axios.post('/chats/private/send', {
      body,
      receiverId,
      senderId: id,
    });
  };

export const sendGroupMessage =
  ({ body, uuid }: { body: string; uuid: string | number }) =>
  async () => {
    const { id } = getAuth(store.getState());

    axios.post('/chats/group/send', {
      body,
      uuid,
      senderId: id,
    });
  };

export const setTypingPrivateMessage =
  ({ receiverId, typing }: { receiverId: string | number; typing: boolean }) =>
  async () => {
    const { id } = getAuth(store.getState());

    axios.post('/chats/private/typing', {
      senderId: id,
      receiverId,
      typing,
    });
  };

export const setTypingGroupMessage =
  ({ uuid, typing }: { uuid: string | number; typing: boolean }) =>
  async () => {
    const { id } = getAuth(store.getState());

    axios.post('/chats/group/typing', {
      senderId: id,
      uuid,
      typing,
    });
  };
