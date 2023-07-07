import { createSelector } from 'reselect';
import { AppState } from '..';

export const getResources =
  <T extends HourChat.Type.ResourceName>(resourceName: T) =>
  (state: AppState) =>
    state.resources?.[resourceName] as HourChat.Store.ResourceRecord[T];

export const getResourceData = <T extends HourChat.Type.ResourceName>(
  resourceName: T
) =>
  createSelector(
    getResources(resourceName) as ReturnType<typeof getResources<T>>,
    (resource) => resource.data as HourChat.Store.ResourceRecord[T]['data']
  );

export const getResourcePage = <T extends HourChat.Type.ResourceName>(
  resourceName: T
) =>
  createSelector(
    getResources(resourceName) as ReturnType<typeof getResources<T>>,
    (resource) => resource.page as HourChat.Store.ResourceRecord[T]['page']
  );

export const getResurceDataById = <
  T extends HourChat.Type.ResourceName,
  U extends HourChat.Store.Resource[T]
>(
  resourceName: T,
  id: U['id']
) =>
  createSelector(
    getResourceData(resourceName),
    (resource) => resource?.[id] as unknown as U | undefined
  );
