import _ from 'lodash';
import { combineReducers } from 'redux';
import { RESOURCE_NAME } from '../../constants/common';
import {
  addExpirationTime,
  hasOwnProperty,
  isExpireable,
  toArray,
} from '../../utils/common';
import { ResourceAction } from '../actions-types/resources';

const createInitialState = <T extends HourChat.Type.ResourceName>() => ({
  data: {} as HourChat.Store.ResourceRecord[T]['data'],
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

        const datas = toArray(action.payload) as HourChat.Store.Resource[T][];

        if (isExpireable(resourceName)) addExpirationTime(datas);

        return {
          ...state,
          data: {
            ...state.data,
            ..._.keyBy(datas, 'id'),
          },
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

        return {
          ...state,
          data: {
            ...state.data,
            [action.payload.id]: {
              ...state.data[action.payload.id],
              ...action.payload.data,
            },
          },
        };
      }

      case ActionType.OVERWRITE: {
        if (_.isNumber(action.payload)) return state;

        const datas = toArray(action.payload) as HourChat.Store.Resource[T][];

        if (isExpireable(resourceName)) addExpirationTime(datas);

        return {
          ...state,
          data: _.keyBy(datas, 'id'),
        };
      }

      case ActionType.DELETE: {
        if (!_.isNumber(action.payload)) return state;

        return {
          ...state,
          data: _.omit(state.data, action.payload),
        };
      }

      case ActionType.SET_PAGE: {
        if (_.isNumber(action.payload)) return state;
        if (!_.isObject(action.payload)) return state;

        return {
          ...state,
          page: {
            ...state.page,
            ...action.payload,
          },
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
