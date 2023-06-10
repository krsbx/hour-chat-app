import { AppState } from '..';

export const getResources =
  <T extends HourChat.Type.ResourceName>(resourceName: T) =>
  (state: AppState) =>
    state.resources?.[resourceName] as HourChat.Store.ResourceRecord[T];

export const getResourceData =
  <T extends HourChat.Type.ResourceName>(resourceName: T) =>
  (state: AppState) =>
    getResources(resourceName)(state).data;

export const getResourcePage =
  <T extends HourChat.Type.ResourceName>(resourceName: T) =>
  (state: AppState) =>
    getResources(resourceName)(state).page;

export const getResurceDataById =
  <T extends HourChat.Type.ResourceName, U extends HourChat.Store.Resource[T]>(
    resourceName: T,
    id: U['id']
  ) =>
  (state: AppState) =>
    getResources(resourceName)(state)?.data?.[id] as U | undefined;
