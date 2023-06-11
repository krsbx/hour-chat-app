import { Formik } from 'formik';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Bubble, Header, Screens, Wrapper } from '../../components';
import { DEFAULT_MESSAGE_VALUE } from '../../constants/defaults';
import { CHAT_STACK } from '../../constants/screens';
import useChatMessageSubscriber from '../../hooks/useChatMessageSubscriber';
import useCurrentUser from '../../hooks/useCurrentUser';
import { chats } from '../../schema';
import { COLOR_PALETTE } from '../../utils/theme';

const ChatView: React.FC<Props> = ({ route }) => {
  const { user: currentUser } = useCurrentUser();
  const [isRefteching, setIsRefetching] = useState(false);

  const flatListRef = useRef<FlatList | null>(null);
  const flexSize = useRef(new Animated.Value(0)).current;
  const emptySize = useRef(new Animated.Value(1)).current;

  const { messages, increaseLimit, isMaxReached } = useChatMessageSubscriber(
    route.params.type,
    route.params.uuid
  );

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

    flatListRef.current.scrollToEnd();
  }, [flatListRef]);

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
      <Animated.View style={{ flex: emptySize }} />
      <Animated.View style={{ flex: flexSize }}>
        <Header.ChatView name={route.params.name} type={route.params.type} />
        <FlatList
          style={{ flex: 1 }}
          data={messages}
          contentContainerStyle={{ paddingHorizontal: scale(10) }}
          onContentSizeChange={onContentSizeChange}
          renderItem={({ item, index }) => {
            if (+item.senderId === currentUser.id) {
              return (
                <Wrapper.DelayContainer delay={100 * (index + 1)}>
                  <Bubble.Outgoing
                    message={item.body}
                    timestamp={item.timestamp}
                    senderId={item.senderId}
                  />
                </Wrapper.DelayContainer>
              );
            }

            return (
              <Wrapper.DelayContainer delay={100 * (index + 1)}>
                <Bubble.Incoming
                  message={item.body}
                  timestamp={item.timestamp}
                  senderId={item.senderId}
                />
              </Wrapper.DelayContainer>
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
