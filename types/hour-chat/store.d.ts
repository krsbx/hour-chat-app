import { RESOURCE_NAME } from '../../src/constants/common';

export type ResourcePage = {
  size: number;
  total: number;
  totalPages: number;
  current: number;
};

export type StoredResource<T> = {
  data: Map<T['id'], T | Partial<T>>;
  page: ResourcePage;
};

export type Resource = {
  [RESOURCE_NAME.USERS]: HourChat.Resource.User;
  [RESOURCE_NAME.DEVICE_TOKENS]: HourChat.Resource.DeviceToken;
  [RESOURCE_NAME.USER_LOCATIONS]: HourChat.Resource.UserLocation;
};

export type ResourceRecord = {
  [RESOURCE_NAME.USERS]: StoredResource<HourChat.Resource.User>;
  [RESOURCE_NAME.DEVICE_TOKENS]: StoredResource<HourChat.Resource.DeviceToken>;
  [RESOURCE_NAME.USER_LOCATIONS]: StoredResource<HourChat.Resource.UserLocation>;
};

export type Action<T extends HourChat.Type.ResourceName> = {
  SET: `resources.${T}.set`;
  UPDATE: `resources.${T}.update`;
  OVERWRITE: `resources.${T}.overwrite`;
  DELETE: `resources.${T}.delete`;
};

export type SetAction<T extends HourChat.Type.ResourceName> = {
  type: Action<T>['SET'];
  payload: Resource[T] | Resource[T][];
};

export type UpdateAction<T extends HourChat.Type.ResourceName> = {
  type: Action<T>['UPDATE'];
  payload: {
    id: Resource[T]['id'];
    data: Partial<Resource[T]>;
  };
};

export type OverwriteAction<T extends HourChat.Type.ResourceName> = {
  type: Action<T>['OVERWRITE'];
  payload: Resource[T] | Resource[T][];
};

export type DeleteAction<T extends HourChat.Type.ResourceName> = {
  type: Action<T>['DELETE'];
  payload: Resource[T]['id'];
};

export type ResourceAction = {
  [RESOURCE_NAME.USERS]: Action<typeof RESOURCE_NAME.USERS>;
  [RESOURCE_NAME.DEVICE_TOKENS]: Action<typeof RESOURCE_NAME.DEVICE_TOKENS>;
  [RESOURCE_NAME.USER_LOCATIONS]: Action<typeof RESOURCE_NAME.USER_LOCATIONS>;
};

export type StoreAction<T extends HourChat.Type.ResourceName> =
  | SetAction<T>
  | UpdateAction<T>
  | OverwriteAction<T>
  | DeleteAction<T>;
