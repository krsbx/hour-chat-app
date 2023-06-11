import { useRoute } from '@react-navigation/native';
import { useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { z } from 'zod';
import { Input } from '../..';
import { CHAT_TYPE } from '../../../constants/common';
import { CHAT_STACK } from '../../../constants/screens';
import useDebounce from '../../../hooks/useDebounce';
import { chats } from '../../../schema';
import {
  sendGroupMessage as _sendGroupMessage,
  sendPrivateMessage as _sendPrivateMessage,
  setTypingGroupMessage as _setTypingGroupMessage,
  setTypingPrivateMessage as _setTypingPrivateMessage,
} from '../../../store/actions/chats';

const InputForm: React.FC<Props> = ({
  sendGroupMessage,
  sendPrivateMessage,
  setTypingGroupMessage,
  setTypingPrivateMessage,
}) => {
  const route =
    useRoute<
      HourChat.Navigation.ChatStackProps<typeof CHAT_STACK.VIEW>['route']
    >();

  const { handleChange, handleBlur, values, setFieldValue } =
    useFormikContext<z.infer<typeof chats.messageSchema>>();

  const onPressOnSend = useCallback(
    (e: GestureResponderEvent) => {
      e.stopPropagation();

      const { body } = values;
      const { type, uuid } = route.params;

      setFieldValue('body', '');

      try {
        switch (type) {
          case CHAT_TYPE.GROUP: {
            sendGroupMessage({
              body,
              uuid,
            });

            break;
          }

          case CHAT_TYPE.PRIVATE: {
            sendPrivateMessage({
              body,
              receiverId: uuid,
            });

            break;
          }
        }
      } catch {
        // Do nothing if there is an error
      }
    },
    [values, route.params, setFieldValue, sendGroupMessage, sendPrivateMessage]
  );

  const onUserTyping = useCallback(
    (typing: boolean) => {
      const { type, uuid } = route.params;

      try {
        switch (type) {
          case CHAT_TYPE.GROUP: {
            setTypingGroupMessage({
              uuid,
              typing,
            });

            break;
          }

          case CHAT_TYPE.PRIVATE: {
            setTypingPrivateMessage({
              receiverId: uuid,
              typing,
            });

            break;
          }
        }
      } catch {
        // Do nothing if there is an error
      }
    },
    [route.params, setTypingGroupMessage, setTypingPrivateMessage]
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

  return (
    <Input.InputField
      onChangeText={handleChange('body')}
      onBlur={handleBlur('body')}
      placeholder={'Type a message...'}
      value={values.body}
      multiline
      rightIcon={
        <TouchableOpacity onPress={onPressOnSend}>
          <Ionicons name="send" />
        </TouchableOpacity>
      }
    />
  );
};

const connector = connect(null, {
  sendPrivateMessage: _sendPrivateMessage,
  sendGroupMessage: _sendGroupMessage,
  setTypingGroupMessage: _setTypingGroupMessage,
  setTypingPrivateMessage: _setTypingPrivateMessage,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & {};

export default connector(InputForm);
