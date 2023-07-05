import {
  DequeueFile,
  DequeuMessage,
  EnqueueFile,
  EnqueueMessage,
  QueueActionType as ActionType,
  QueuReducer,
} from '../actions-types/queue';

const initialState: QueuReducer = {
  messages: [],
  files: [],
};

const reducer = (
  state = initialState,
  action: EnqueueMessage | DequeuMessage | EnqueueFile | DequeueFile
): QueuReducer => {
  switch (action.type) {
    case ActionType.ENQUEUE_MESSAGE: {
      if (!state.messages.length)
        return {
          ...state,
          messages: [action.payload],
        };

      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }

    case ActionType.DEQUEU_MESSAGE: {
      if (!state.messages.length) return state;

      const messages = [...state.messages];
      messages.shift();

      return {
        ...state,
        messages,
      };
    }

    case ActionType.ENQUEUE_FILE: {
      if (!state.files.length) {
        return {
          ...state,
          files: [action.payload],
        };
      }

      return {
        ...state,
        files: [...state.files, action.payload],
      };
    }

    case ActionType.DEQUEUE_FILE: {
      if (!state.files.length) return state;

      const files = [...state.files];
      files.shift();

      return {
        ...state,
        files,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
