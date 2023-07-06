import { CHAT_TYPE } from '../../constants/common';
import {
  DecreaseNotification,
  IncreaseNotification,
  NotificationActionType as ActionType,
  NotificationReducer,
  SetNotification,
} from '../actions-types/notifications';

const initialState: NotificationReducer = {
  [CHAT_TYPE.PRIVATE]: {},
  [CHAT_TYPE.GROUP]: {},
};

const reducer = (
  state = initialState,
  action: IncreaseNotification | DecreaseNotification | SetNotification
): NotificationReducer => {
  switch (action.type) {
    case ActionType.SET: {
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          [action.payload.uuid]: action.payload.value,
        },
      };
    }

    case ActionType.INCREMENT: {
      const currentValue =
        state[action.payload.type]?.[action.payload.uuid] ?? 0;
      const value = currentValue + 1;

      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          [action.payload.uuid]: value,
        },
      };
    }

    case ActionType.DECREMENT: {
      const currentValue =
        state[action.payload.type]?.[action.payload.uuid] ?? 0;
      const value = Math.max(currentValue - 1, 0);

      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          [action.payload.uuid]: value,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
