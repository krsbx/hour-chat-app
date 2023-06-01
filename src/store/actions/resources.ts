import { ResourceAction as ActionType } from '../actions-types/resources';

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
