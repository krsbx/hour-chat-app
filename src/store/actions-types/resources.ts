import _ from 'lodash';
import { RESOURCE_NAME } from '../../constants/common';

const createResourceActionType = <T extends HourChat.Type.ResourceName>(
  resourceName: T
): HourChat.Store.Action<T> => ({
  SET: `resources.${resourceName}.set`,
  UPDATE: `resources.${resourceName}.update`,
  OVERWRITE: `resources.${resourceName}.overwrite`,
  DELETE: `resources.${resourceName}.delete`,
  SET_PAGE: `resources.${resourceName}.set.page`,
});

export const ResourceAction = _.reduce(
  RESOURCE_NAME,
  (prev, curr) => {
    Object.assign(prev, {
      [curr]: createResourceActionType(curr),
    });

    return prev;
  },
  {} as unknown as HourChat.Store.ResourceAction
);
