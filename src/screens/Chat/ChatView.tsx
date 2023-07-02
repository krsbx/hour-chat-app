import { StackActions, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import _ from 'lodash';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect, ConnectedProps } from 'react-redux';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Bubble, Header, Screens, Wrapper } from '../../components';
import { DEFAULT_MESSAGE_VALUE } from '../../constants/defaults';
import { CHAT_STACK } from '../../constants/screens';
import useChatDecryption from '../../hooks/useChatDecryption';
import useChatMessageSubscriber from '../../hooks/useChatMessageSubscriber';
import useCurrentUser from '../../hooks/useCurrentUser';
import useLastMessageListener from '../../hooks/useLastMessageListener';
import useOverwriteBack from '../../hooks/useOverwriteBack';
import { chats } from '../../schema';
import { AppState } from '../../store';
import { setConfig as _setConfig } from '../../store/actions/config';
import { getConfig } from '../../store/selectors/config';
import { COLOR_PALETTE } from '../../utils/theme';

const ChatView: React.FC<Props> = ({ config, setConfig }) => {
  const navigation =
    useNavigation<
      HourChat.Navigation.ChatStackNavigation<typeof CHAT_STACK.VIEW>
    >();
  const { user: currentUser } = useCurrentUser();
  const [isRefteching, setIsRefetching] = useState(false);

  const flatListRef = useRef<FlatList | null>(null);
  const flexSize = useRef(new Animated.Value(0)).current;
  const emptySize = useRef(new Animated.Value(1)).current;

  const { total } = useLastMessageListener(config);
  const { messages, increaseLimit, isMaxReached } = useChatMessageSubscriber({
    ..._.pick(config, ['type', 'uuid']),
    total,
  });

  const onPressOnBack = useCallback(() => {
    setConfig({
      attachment: [],
    });

    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.dispatch(StackActions.replace(CHAT_STACK.LIST));
  }, [navigation, setConfig]);

  useOverwriteBack(onPressOnBack);

  const chatHasMessage = useMemo(() => messages.length > 0, [messages]);
  useChatDecryption([chatHasMessage]);

  const startAnimation = useCallback(() => {
    Animated.parallel([
      Animated.timing(flexSize, {
        toValue: 1,
        duration: 250,
        easing: Easing.circle,
        useNativeDriver: false,
      }),
      Animated.timing(emptySize, {
        toValue: 0,
        duration: 250,
        easing: Easing.circle,
        useNativeDriver: false,
      }),
    ]).start();
  }, [emptySize, flexSize]);

  const onContentSizeChange = useCallback(() => {
    if (!flatListRef.current) return;

    if (!messages.length) return;

    flatListRef.current.scrollToEnd();
  }, [flatListRef, messages]);

  const onRefetching = useCallback(() => {
    if (isRefteching || isMaxReached) return;

    setIsRefetching(true);

    increaseLimit();

    setTimeout(() => {
      setIsRefetching(false);
    }, 250);
  }, [setIsRefetching, increaseLimit, isRefteching, isMaxReached]);

  useEffect(startAnimation, [startAnimation]);

  return (
    <View style={style.mainContainer}>
      <StatusBar
        animated
        backgroundColor={COLOR_PALETTE.BLUE_10}
        barStyle={'light-content'}
      />
      <Animated.View style={{ flex: emptySize }} />
      <Animated.View style={{ flex: flexSize }}>
        <Header.BackHeader
          title={`[${_.capitalize(config.type)}] ${config.name}`}
          onBack={onPressOnBack}
        />
        <FlatList
          style={{ flex: 1 }}
          data={messages ?? []}
          contentContainerStyle={{
            paddingHorizontal: scale(10),
            paddingBottom: scale(20),
          }}
          onContentSizeChange={onContentSizeChange}
          onLayout={onContentSizeChange}
          renderItem={({
            item,
            index,
          }: ListRenderItemInfo<
            HourChat.Chat.PrivateMetadata | HourChat.Chat.GroupMetadata
          >) => {
            const prev = messages?.[index - 1];

            if (item.senderId === currentUser.id) {
              return (
                <Wrapper.ChatBubbleContainer current={item} prev={prev}>
                  <Bubble.Outgoing {...item} />
                </Wrapper.ChatBubbleContainer>
              );
            }

            return (
              <Wrapper.ChatBubbleContainer current={item} prev={prev}>
                <Bubble.Incoming {...item} />
              </Wrapper.ChatBubbleContainer>
            );
          }}
          keyExtractor={(item, index) =>
            `${item.timestamp.toMillis()}-${item.uuid}-${index}`
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefteching}
              onRefresh={onRefetching}
            />
          }
          refreshing={isRefteching}
          ref={flatListRef}
        />
        <Formik
          validationSchema={toFormikValidationSchema(chats.messageSchema)}
          initialValues={_.cloneDeep(DEFAULT_MESSAGE_VALUE)}
          onSubmit={console.log}
          validateOnMount
        >
          <Screens.Chat.MessageInput />
        </Formik>
      </Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR_PALETTE.WHITE,
  },
});

const mapStateToProps = (state: AppState) => ({
  config: getConfig(state),
});

const connector = connect(mapStateToProps, {
  setConfig: _setConfig,
});

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps;

export default connector(ChatView);
