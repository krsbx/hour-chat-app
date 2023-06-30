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
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Bubble, Header, Screens, Wrapper } from '../../components';
import { DEFAULT_MESSAGE_VALUE } from '../../constants/defaults';
import { CHAT_STACK } from '../../constants/screens';
import useChatDecryption from '../../hooks/useChatDecryption';
import useChatMessageSubscriber from '../../hooks/useChatMessageSubscriber';
import useCurrentUser from '../../hooks/useCurrentUser';
import useLastMessageListener from '../../hooks/useLastMessageListener';
import { chats } from '../../schema';
import { COLOR_PALETTE } from '../../utils/theme';

const ChatView: React.FC<Props> = ({ route }) => {
  const { user: currentUser } = useCurrentUser();
  const [isRefteching, setIsRefetching] = useState(false);

  const flatListRef = useRef<FlatList | null>(null);
  const flexSize = useRef(new Animated.Value(0)).current;
  const emptySize = useRef(new Animated.Value(1)).current;

  const { total } = useLastMessageListener(route.params);
  const { messages, increaseLimit, isMaxReached } = useChatMessageSubscriber({
    ...route.params,
    total,
  });

  const chatHasMessage = useMemo(() => messages.length > 0, [messages]);
  const config = useChatDecryption(route.params, [chatHasMessage]);

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
        <Header.ChatView name={route.params.name} type={route.params.type} />
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
                  <Bubble.Outgoing config={config} {...item} />
                </Wrapper.ChatBubbleContainer>
              );
            }

            return (
              <Wrapper.ChatBubbleContainer current={item} prev={prev}>
                <Bubble.Incoming config={config} {...item} />
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

type Props = HourChat.Navigation.ChatStackProps<typeof CHAT_STACK.VIEW>;

export default ChatView;
