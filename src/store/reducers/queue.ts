import {
  DequeueFile,
  DequeuFailedMessage,
  DequeuMessage,
  EnqueueFailedMessage,
  EnqueueFile,
  EnqueueMessage,
  QueueActionType as ActionType,
  QueuReducer,
  ResetQueue,
} from '../actions-types/queue';

const initialState: QueuReducer = {
  messages: [],
  failedMessages: [],
  files: [],
};

const reducer = (
  state = initialState,
  action:
    | EnqueueMessage
    | DequeuMessage
    | EnqueueFile
    | DequeueFile
    | EnqueueFailedMessage
    | DequeuFailedMessage
    | ResetQueue
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

    case ActionType.ENQUEUE_FAILED_MESSAGE: {
      if (!state.failedMessages.length)
        return {
          ...state,
          failedMessages: [action.payload],
        };

      return {
        ...state,
        failedMessages: [...state.failedMessages, action.payload],
      };
    }

    case ActionType.DEQUEUE_FAILED_MESSAGE: {
      if (!state.failedMessages.length) return state;

      const failedMessages = [...state.failedMessages];
      failedMessages.shift();

      return {
        ...state,
        failedMessages,
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

    case ActionType.RESET: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
