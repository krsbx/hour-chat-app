import { RESOURCE_NAME } from '../../../constants/common';
import axios from '../../axios';

export const updateUser =
  (
    id: string,
    payload: Partial<HourChat.Resource.User>,
    query = '',
    overwrite = false
  ) =>
  async () => {
    const { data } = await axios.patch<
      HourChat.Response.Resource<HourChat.Resource.User>
    >(`/${RESOURCE_NAME.USERS}/${id}?${query}`, payload, {
      headers: {
        resourceName: RESOURCE_NAME.USERS,
        overwrite,
      },
    });

    return data;
  };
