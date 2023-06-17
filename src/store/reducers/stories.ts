import _ from 'lodash';
import {
  DeleteStories,
  OverwriteStories,
  SetStories,
  StoriesActionType as ActionType,
  UpdateStories,
} from '../actions-types/stories';

const initialState = [] as HourChat.Story.StoryWithUuid[];

export const sortStory = (
  a: HourChat.Story.StoryWithUuid,
  b: HourChat.Story.StoryWithUuid
) => a.timestamp.toMillis() - b.timestamp.toMillis();

const reducer = (
  state = _.cloneDeep(initialState),
  action: SetStories | UpdateStories | OverwriteStories | DeleteStories
): HourChat.Story.StoryWithUuid[] => {
  switch (action.type) {
    case ActionType.SET: {
      const payload = _.isArray(action.payload)
        ? action.payload
        : [action.payload];

      return _.uniqBy([...state, ...payload], 'uuid').sort(sortStory);
    }

    case ActionType.UPDATE: {
      const index = state.findIndex(({ uuid }) => uuid === action.payload.uuid);

      if (index === -1) return state;

      state[index] = {
        ...state[index],
        ...action.payload,
      };

      return [...state].sort(sortStory);
    }

    case ActionType.OVERWRITE: {
      const payload = _.isArray(action.payload)
        ? action.payload
        : [action.payload];

      return _.uniqBy(payload, 'uuid').sort(sortStory);
    }

    case ActionType.DELETE: {
      const index = state.findIndex(({ uuid }) => uuid === action.payload);

      if (index === -1) return state;

      state.splice(index, 1);

      return [...state].sort(sortStory);
    }

    default: {
      return state;
    }
  }
};

export default reducer;
