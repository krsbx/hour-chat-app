import { ResourceAction as ActionType } from '../actions-types/resources';
import axios from '../axios';

export const setResource = <
  T extends HourChat.Type.ResourceName,
  U extends HourChat.Store.Resource[T]
>(
  resourceName: T,
  payload: U | U[]
) => ({
  type: ActionType[resourceName].SET,
  payload,
});

export const setResourcePage = <T extends HourChat.Type.ResourceName>(
  resourceName: T,
  payload: Partial<HourChat.Store.ResourcePage>
) => ({
  type: ActionType[resourceName].SET_PAGE,
  payload,
});

export const updateResource = <
  T extends HourChat.Type.ResourceName,
  U extends HourChat.Store.Resource[T]
>(
  resourceName: T,
  payload: { id: U['id']; data: Partial<U> }
) => ({
  type: ActionType[resourceName].UPDATE,
  payload, // { id, data }
});

export const overwriteResource = <
  T extends HourChat.Type.ResourceName,
  U extends HourChat.Store.Resource[T]
>(
  resourceName: T,
  payload: U | U[]
) => ({
  type: ActionType[resourceName].OVERWRITE,
  payload,
});

export const deleteResource = <
  T extends HourChat.Type.ResourceName,
  U extends HourChat.Store.Resource[T]['id']
>(
  resourceName: T,
  payload: U
) => ({
  type: ActionType[resourceName].DELETE,
  payload, // id
});

export const getResourceById =
  <T extends HourChat.Type.ResourceName>(
    resourceName: T,
    id: string | number,
    query = '',
    overwrite = false
  ) =>
  async () => {
    const { data } = await axios.get<
      HourChat.Response.Resource<HourChat.Store.Resource[T]>
    >(`/${resourceName}/${id}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });

    return data.data;
  };

export const getResources =
  <T extends HourChat.Type.ResourceName>(
    resourceName: T,
    query = '',
    overwrite = false
  ) =>
  async () => {
    const { data } = await axios.get<
      HourChat.Response.Resources<HourChat.Store.Resource[T]>
    >(`/${resourceName}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });

    return data;
  };
