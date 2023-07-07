import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import moment from 'moment';
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
import { CHAT_STACK } from '../../../constants/screens';
import useCurrentUser from '../../../hooks/caches/useCurrentUser';
import { chats } from '../../../schema';
import { AppState } from '../../../store';
import { setCurrentChat as _setCurrentChat } from '../../../store/actions/currentChat';
import { enqueuMessage as _enqueuMessage } from '../../../store/actions/queue';
import { getCurrentChat } from '../../../store/selectors/currentChat';

const InputForm: React.FC<Props> = ({
  setCurrentChat,
  enqueuMessage,
  currentChat,
}) => {
  const { user: currentUser } = useCurrentUser();
  const isScreenFocused = useIsFocused();
  const navigation =
    useNavigation<
      HourChat.Navigation.ChatStackNavigation<typeof CHAT_STACK.VIEW>
    >();
  const { handleChange, handleBlur, values, setFieldValue, validateForm } =
    useFormikContext<z.infer<typeof chats.messageSchema>>();
  const { type, uuid } = currentChat;

  const onPressOnSend = useCallback(
    async (e: GestureResponderEvent) => {
      e.stopPropagation();

      try {
        const errors = await validateForm(values);

        if (!_.isEmpty(errors)) throw errors;

        enqueuMessage({
          body: values.body ?? '',
          files: values.files ?? [],
          uuid,
          type,
          senderId: currentUser.id,
          timestamp: moment().toDate(),
        });

        setFieldValue('body', '');
        setFieldValue('files', []);
        setCurrentChat({
          attachment: [],
        });
      } catch {
        // Do nothing if there is an error
      }
    },
    [
      type,
      uuid,
      values,
      currentUser.id,
      enqueuMessage,
      setFieldValue,
      setCurrentChat,
      validateForm,
    ]
  );

  const onPressOnAttach = useCallback(async () => {
    try {
      const results = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.allFiles],
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
      setCurrentChat({
        attachment: normalizedResults,
      });
    } catch {
      // Do nothing if there is an error
    }
  }, [values.files, setFieldValue, setCurrentChat]);

  const onPressOnMedia = useCallback(() => {
    setCurrentChat({
      files: values.files ?? [],
    });
    navigation.push(CHAT_STACK.MEDIA, {
      editable: true,
    });
  }, [navigation, values.files, setCurrentChat]);

  useEffect(() => {
    if (_.isEqual(values.files, currentChat.attachment)) return;

    setFieldValue('files', currentChat.attachment);
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
                <Media.Image style={{ width: ScreenWidth * 0.2 }} item={item} />
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
  currentChat: getCurrentChat(state),
});

const connector = connect(mapStateToProps, {
  setCurrentChat: _setCurrentChat,
  enqueuMessage: _enqueuMessage,
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
