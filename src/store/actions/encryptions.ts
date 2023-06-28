import { AppDispatch } from '..';
import { EncryptionActionType } from '../actions-types/encryption';
import axios from '../axios';

export const getChatEncryption =
  ({
    receiverId,
    senderId,
    type,
  }: {
    senderId: string | number;
    receiverId: string | number;
    type: HourChat.Type.ChatType;
  }) =>
  async (dispatch: AppDispatch) => {
    const { data } = await axios.get<
      HourChat.Response.Resource<HourChat.Type.Encryption>
    >(
      `/encryptions?senderId=${senderId}&receiverId=${receiverId}&type=${type}`
    );

    dispatch({
      type: EncryptionActionType.SET,
      payload: {
        uuid: receiverId,
        config: data.data,
        type: type,
      },
    });

    return data;
  };
