import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect, ConnectedProps } from 'react-redux';
import { z } from 'zod';
import { Input, Media } from '../..';
import { CHAT_TYPE } from '../../../constants/common';
import { CHAT_STACK } from '../../../constants/screens';
import useOnUserTyping from '../../../hooks/useOnUserTyping';
import { chats } from '../../../schema';
import { AppState } from '../../../store';
import {
  sendGroupMessage as _sendGroupMessage,
  sendPrivateMessage as _sendPrivateMessage,
} from '../../../store/actions/chats';
import { setConfig as _setConfig } from '../../../store/actions/config';
import { uploadFiles as _uploadFiles } from '../../../store/actions/files';
import { getConfig } from '../../../store/selectors/config';

const InputForm: React.FC<Props> = ({
  sendGroupMessage,
  sendPrivateMessage,
  uploadFiles,
  setConfig,
  config,
}) => {
  const isScreenFocused = useIsFocused();
  const navigation =
    useNavigation<
      HourChat.Navigation.ChatStackNavigation<typeof CHAT_STACK.VIEW>
    >();
  const { handleChange, handleBlur, values, setFieldValue, validate } =
    useFormikContext<z.infer<typeof chats.messageSchema>>();
  const { type, uuid } = config;

  useOnUserTyping();

  const onPressOnSend = useCallback(
    async (e: GestureResponderEvent) => {
      e.stopPropagation();

      const { body } = values;

      try {
        await validate?.(values);

        setFieldValue('body', '');
        setFieldValue('files', []);
        setConfig({
          attachment: [],
        });

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
      setConfig,
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
        ..._.map(
          results,
          (result) =>
            _.pick(result, ['uri', 'type', 'name']) as HourChat.Type.File
        ),
      ];

      setFieldValue('files', normalizedResults);
      setConfig({
        attachment: normalizedResults,
      });
    } catch {
      // Do nothing if there is an error
    }
  }, [values.files, setFieldValue, setConfig]);

  const onPressOnMedia = useCallback(() => {
    setConfig({
      files: values.files ?? [],
    });
    navigation.push(CHAT_STACK.MEDIA, {
      editable: true,
    });
  }, [navigation, values.files, setConfig]);

  useEffect(() => {
    if (_.isEqual(values.files, config.attachment)) return;

    setFieldValue('files', config.attachment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScreenFocused]);

  return (
    <View
      style={{
        flexDirection: 'column',
        gap: scale(5),
      }}
    >
      <TouchableOpacity
        style={{ paddingBottom: 0, alignItems: 'center' }}
        onPress={onPressOnMedia}
      >
        <FlatList
          data={values.files}
          style={{
            minHeight: 0,
            maxHeight: scale(ScreenHeight * 0.15),
          }}
          columnWrapperStyle={{ gap: scale(4) }}
          numColumns={4}
          renderItem={({ item, index }) => {
            if (index < 3)
              return (
                <Media.Image style={{ width: ScreenWidth * 0.2 }} file={item} />
              );

            if (index === 3)
              return <Media.More style={{ width: ScreenWidth * 0.2 }} />;

            return null;
          }}
        />
      </TouchableOpacity>
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
        inputStyle={style.inputStyle}
        inputContainerStyle={style.inputContainer}
        leftIconContainerStyle={style.resetBorderWidth}
        rightIconContainerStyle={style.resetBorderWidth}
      />
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  config: getConfig(state),
});

const connector = connect(mapStateToProps, {
  sendPrivateMessage: _sendPrivateMessage,
  sendGroupMessage: _sendGroupMessage,
  setConfig: _setConfig,
  uploadFiles: _uploadFiles,
});

const style = StyleSheet.create({
  inputStyle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: scale(12),
    borderBottomLeftRadius: scale(12),
    borderTopRightRadius: scale(12),
    borderBottomRightRadius: scale(12),
  },
  inputContainer: {
    marginBottom: 0,
  },
  resetBorderWidth: {
    borderWidth: 0,
  },
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps;

export default connector(InputForm);
