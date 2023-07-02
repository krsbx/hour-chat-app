import {
  DequeuMessage,
  EnqueueMessage,
  MessageQueueActionType as ActionType,
  MessageQueuReducer,
} from '../actions-types/messageQueue';

const initialState: MessageQueuReducer = {
  queue: [],
};

const reducer = (
  state = initialState,
  action: EnqueueMessage | DequeuMessage
) => {
  switch (action.type) {
    case ActionType.ENQUEUE: {
      return {
        queue: [...(state.queue ?? []), action.payload],
      };
    }

    case ActionType.DEQUEU: {
      const queue = [...state.queue];
      queue.shift();

      return {
        queue,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
