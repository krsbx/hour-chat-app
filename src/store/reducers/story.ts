import _ from 'lodash';
import { DocumentPickerResponse } from 'react-native-document-picker';
import {
  DeleteFile,
  DeleteResolution,
  DeleteStory,
  ResetStory,
  SetFile,
  SetResolution,
  SetStory,
  StoryActionType as ActionType,
  StoryReducer,
} from '../actions-types/story';

const initialState = {
  story: '',
  file: {},
  resolution: {
    width: 0,
    height: 0,
  },
} as StoryReducer;

const reducer = (
  state = _.cloneDeep(initialState),
  action:
    | DeleteFile
    | DeleteResolution
    | DeleteStory
    | ResetStory
    | SetFile
    | SetResolution
    | SetStory
): StoryReducer => {
  switch (action.type) {
    case ActionType.SET_STORY: {
      return {
        ...state,
        story: action.payload,
      };
    }

    case ActionType.DELETE_STORY: {
      return {
        ...state,
        story: '',
      };
    }

    case ActionType.SET_FILE: {
      return {
        ...state,
        file: action.payload,
      };
    }

    case ActionType.DELETE_FILE: {
      return {
        ...state,
        file: {} as DocumentPickerResponse,
      };
    }

    case ActionType.SET_RESOLUTION: {
      return {
        ...state,
        resolution: {
          ...state.resolution,
          ...action.payload,
        },
      };
    }

    case ActionType.DELETE_RESOLUTION: {
      return {
        ...state,
        resolution: {
          width: 0,
          height: 0,
        },
      };
    }

    case ActionType.RESET: {
      return _.cloneDeep(initialState);
    }

    default: {
      return state;
    }
  }
};

export default reducer;
