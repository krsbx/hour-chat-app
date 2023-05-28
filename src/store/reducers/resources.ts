import _ from 'lodash';
import { combineReducers } from 'redux';
import { RESOURCE_NAME } from '../../constants/common';
import { hasOwnProperty } from '../../utils/common';
import { ResourceAction } from '../action-types/resources';

const toArray = <T>(value: T) => (_.isArray(value) ? value : [value]) as T[];

const createInitialState = () => ({
  data: new Map(),
  page: {
    size: 0,
    total: 0,
    totalPages: 0,
    current: 0,
  },
});

const reducer = <T extends HourChat.Type.ResourceName>(resourceName: T) => {
  const ActionType = ResourceAction[resourceName];

  return (
    state = createInitialState(),
    action: HourChat.Store.StoreAction<T>
  ) => {
    switch (action.type) {
      case ActionType.SET: {
        if (_.isString(action.payload)) return state;

        toArray(action.payload).forEach((data) => {
          const newData = data as HourChat.Store.Resource[T];
          state.data.set(newData.id, newData as never);
        });

        return {
          ...state,
        };
      }

      case ActionType.UPDATE: {
        if (_.isString(action.payload) || _.isArray(action.payload))
          return state;
        if (
          !hasOwnProperty<HourChat.Store.Resource[T]['id']>(
            action.payload,
            'id'
          ) ||
          !hasOwnProperty(action.payload, 'data')
        )
          return state;

        state.data.set(action.payload.id, action.payload.data);

        return {
          ...state,
        };
      }

      case ActionType.OVERWRITE: {
        if (_.isString(action.payload)) return state;

        state.data.clear();

        const datas = _.isArray(action.payload)
          ? action.payload
          : [action.payload];

        _.forEach(datas, (data) => {
          const newData = data as HourChat.Store.Resource[T];
          state.data.set(newData.id, newData as never);
        });

        return {
          ...state,
        };
      }

      case ActionType.DELETE: {
        if (!_.isString(action.payload)) return state;

        state.data.delete(action.payload);

        return {
          ...state,
        };
      }

      default: {
        return state;
      }
    }
  };
};

const reducers = _.reduce(
  RESOURCE_NAME,
  (prev, curr) => {
    Object.assign(prev, {
      [curr]: reducer(curr),
    });

    return prev;
  },
  {} as Record<HourChat.Type.ResourceName, ReturnType<typeof reducer>>
);

export default combineReducers<
  HourChat.Store.ResourceRecord,
  | HourChat.Store.StoreAction<typeof RESOURCE_NAME.USERS>
  | HourChat.Store.StoreAction<typeof RESOURCE_NAME.DEVICE_TOKENS>
  | HourChat.Store.StoreAction<typeof RESOURCE_NAME.USER_LOCATIONS>
>(reducers as never);
