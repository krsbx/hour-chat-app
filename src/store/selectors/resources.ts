import { AppState } from '..';

export const getResources =
  <T extends HourChat.Type.ResourceName>(resourceName: T) =>
  (state: AppState) =>
    state.resources[resourceName] as HourChat.Store.ResourceRecord[T];

export const getResourceData =
  <T extends HourChat.Type.ResourceName>(resourceName: T) =>
  (state: AppState) =>
    getResources(resourceName)(state).data;

export const getResourcePage =
  <T extends HourChat.Type.ResourceName>(resourceName: T) =>
  (state: AppState) =>
    getResources(resourceName)(state).page;
