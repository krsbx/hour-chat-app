import { useFormikContext } from 'formik';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import { CHAT_TYPE } from '../../constants/common';
import { chats } from '../../schema';
import {
  setTypingGroupMessage,
  setTypingPrivateMessage,
} from '../../store/actions/chats';
import { getCurrentChat } from '../../store/selectors/currentChat';
import useDebounce from '../common/useDebounce';

const useOnUserTyping = () => {
  const { values } = useFormikContext<z.infer<typeof chats.messageSchema>>();
  const { type, uuid } = useSelector(getCurrentChat);

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

export default useOnUserTyping;
