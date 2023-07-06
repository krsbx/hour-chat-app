import _ from 'lodash';
import {
  DeleteMyStories,
  DeleteUsersStories,
  OverwriteMyStories,
  OverwriteUsersStories,
  SetMyStories,
  SetUserStories,
  StoriesActionType as ActionType,
  StoriesReducer,
  UpdateMyStories,
  UpdateUserStories,
} from '../actions-types/stories';

const initialState: StoriesReducer = {
  user: [],
  users: [],
};

export const sortStory = (
  a: HourChat.Story.StoryWithUuid,
  b: HourChat.Story.StoryWithUuid
) => b.createdAt.toMillis() - a.createdAt.toMillis();

const reducer = (
  state = initialState,
  action:
    | DeleteMyStories
    | DeleteUsersStories
    | OverwriteMyStories
    | OverwriteUsersStories
    | SetMyStories
    | SetUserStories
    | UpdateMyStories
    | UpdateUserStories
): StoriesReducer => {
  switch (action.type) {
    case ActionType.SET_USERS: {
      const payload = _.isArray(action.payload)
        ? action.payload
        : [action.payload];

      return {
        ...state,
        users: _.uniqBy([...state.users, ...payload], 'uuid').sort(sortStory),
      };
    }

    case ActionType.SET_USER: {
      const payload = _.isArray(action.payload)
        ? action.payload
        : [action.payload];

      return {
        ...state,
        user: _.uniqBy([...state.user, ...payload], 'uuid').sort(sortStory),
      };
    }

    case ActionType.UPDATE_USERS: {
      const index = state.users.findIndex(
        ({ uuid }) => uuid === action.payload.uuid
      );

      if (index === -1) return state;

      state.users[index] = {
        ...state.users[index],
        ...action.payload,
      };

      return {
        ...state,
        users: [...state.users].sort(sortStory),
      };
    }

    case ActionType.UPDATE_USER: {
      const index = state.user.findIndex(
        ({ uuid }) => uuid === action.payload.uuid
      );

      if (index === -1) return state;

      state.user[index] = {
        ...state.user[index],
        ...action.payload,
      };

      return {
        ...state,
        user: [...state.user].sort(sortStory),
      };
    }

    case ActionType.OVERWRITE_USERS: {
      const payload = _.isArray(action.payload)
        ? action.payload
        : [action.payload];

      return {
        ...state,
        users: _.uniqBy(payload, 'uuid').sort(sortStory),
      };
    }

    case ActionType.OVERWRITE_USER: {
      const payload = _.isArray(action.payload)
        ? action.payload
        : [action.payload];

      return {
        ...state,
        user: _.uniqBy(payload, 'uuid').sort(sortStory),
      };
    }

    case ActionType.DELETE_USERS: {
      const index = state.users.findIndex(
        ({ uuid }) => uuid === action.payload
      );

      if (index === -1) return state;

      state.users.splice(index, 1);

      return {
        ...state,
        users: [...state.users].sort(sortStory),
      };
    }

    case ActionType.DELETE_USER: {
      const index = state.user.findIndex(({ uuid }) => uuid === action.payload);

      if (index === -1) return state;

      state.user.splice(index, 1);

      return {
        ...state,
        user: [...state.user].sort(sortStory),
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
