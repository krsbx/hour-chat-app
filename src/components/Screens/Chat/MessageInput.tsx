import { useFormikContext } from 'formik';
import _ from 'lodash';
import React, { useCallback } from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { z } from 'zod';
import { Input } from '../..';
import { CHAT_TYPE } from '../../../constants/common';
import useOnUserTyping from '../../../hooks/useOnUserTyping';
import { chats } from '../../../schema';
import { AppState } from '../../../store';
import {
  sendGroupMessage as _sendGroupMessage,
  sendPrivateMessage as _sendPrivateMessage,
} from '../../../store/actions/chats';
import { uploadFiles as _uploadFiles } from '../../../store/actions/files';
import { getEncryptor } from '../../../store/selectors/encryptor';

const InputForm: React.FC<Props> = ({
  sendGroupMessage,
  sendPrivateMessage,
  uploadFiles,
  encryptor,
}) => {
  const { type, uuid } = encryptor;
  const { handleChange, handleBlur, values, setFieldValue, validate } =
    useFormikContext<z.infer<typeof chats.messageSchema>>();

  useOnUserTyping();

  const onPressOnSend = useCallback(
    async (e: GestureResponderEvent) => {
      e.stopPropagation();

      const { body } = values;

      try {
        await validate?.(values);

        setFieldValue('body', '');
        setFieldValue('files', []);

        const files: HourChat.Type.File[] = [];

        if (values.files?.length) {
          const { data } = await uploadFiles(values.files as never);

          files.push(
            ..._.map(
              data,
              (uri, id) =>
                ({
                  ...(values.files?.[id] ?? {}),
                  uri,
                } as never)
            )
          );
        }

        switch (type) {
          case CHAT_TYPE.GROUP: {
            sendGroupMessage({
              body: body ?? '',
              files: files ?? [],
              uuid,
            });

            break;
          }

          case CHAT_TYPE.PRIVATE: {
            sendPrivateMessage({
              body: body ?? '',
              files: files ?? [],
              receiverId: uuid,
            });

            break;
          }
        }
      } catch {
        // Do nothing if there is an error
      }
    },
    [
      values,
      type,
      uuid,
      validate,
      setFieldValue,
      uploadFiles,
      sendGroupMessage,
      sendPrivateMessage,
    ]
  );

  const onPressOnAttach = useCallback(async () => {
    try {
      const results = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.allFiles],
        copyTo: 'cachesDirectory',
      });

      const normalizedResults = [
        ...(values?.files ?? []),
        ..._.map(results, (result) => _.pick(result, ['uri', 'type', 'name'])),
      ];

      setFieldValue('files', normalizedResults);
    } catch {
      // Do nothing if there is an error
    }
  }, [values.files, setFieldValue]);

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Input.InputField
        onChangeText={handleChange('body')}
        onBlur={handleBlur('body')}
        placeholder={'Type a message...'}
        value={values.body}
        multiline
        containerStyle={{
          maxHeight: scale(75),
        }}
        leftIcon={
          <TouchableOpacity activeOpacity={0.5} onPress={onPressOnAttach}>
            <Ionicons name="attach" size={scale(18)} />
          </TouchableOpacity>
        }
        rightIcon={
          <TouchableOpacity activeOpacity={0.5} onPress={onPressOnSend}>
            <Ionicons name="send" />
          </TouchableOpacity>
        }
        inputStyle={{
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopLeftRadius: scale(12),
          borderBottomLeftRadius: scale(12),
          borderTopRightRadius: scale(12),
          borderBottomRightRadius: scale(12),
        }}
        inputContainerStyle={{
          marginBottom: 0,
        }}
        leftIconContainerStyle={{
          borderWidth: 0,
        }}
        rightIconContainerStyle={{
          borderWidth: 0,
        }}
      />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  encryptor: getEncryptor(state),
});

const connector = connect(mapStateToProps, {
  sendPrivateMessage: _sendPrivateMessage,
  sendGroupMessage: _sendGroupMessage,
  uploadFiles: _uploadFiles,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps;

export default connector(InputForm);
