import { useFormikContext } from 'formik';
import { useCallback } from 'react';
import { z } from 'zod';
import { CHAT_TYPE } from '../constants/common';
import { CHAT_STACK } from '../constants/screens';
import { chats } from '../schema';
import {
  setTypingGroupMessage,
  setTypingPrivateMessage,
} from '../store/actions/chats';
import useDebounce from './useDebounce';

const useOnUserTyping = ({ type, uuid }: Params) => {
  const { values } = useFormikContext<z.infer<typeof chats.messageSchema>>();

  const onUserTyping = useCallback(
    (typing: boolean) => {
      try {
        switch (type) {
          case CHAT_TYPE.GROUP: {
            setTypingGroupMessage({
              uuid,
              typing,
            })();

            break;
          }

          case CHAT_TYPE.PRIVATE: {
            setTypingPrivateMessage({
              receiverId: uuid,
              typing,
            })();

            break;
          }
        }
      } catch {
        // Do nothing if there is an error
      }
    },
    [type, uuid]
  );

  useDebounce(() => {
    onUserTyping(true);
  }, [values.body]);

  useDebounce(
    () => {
      onUserTyping(false);
    },
    [values.body],
    3000
  );
};

type Params = HourChat.Navigation.ChatStackProps<
  typeof CHAT_STACK.VIEW
>['route']['params'];

export default useOnUserTyping;
