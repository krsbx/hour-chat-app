import { Input } from '@rneui/base';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { Screens, Wrapper } from '../../components';
import { CHAT_STACK } from '../../constants/screens';
import useChatMessageSubscriber from '../../hooks/useChatMessageSubscriber';
import useCurrentUser from '../../hooks/useCurrentUser';
import { COLOR_PALETTE } from '../../utils/theme';

const ChatView: React.FC<Props> = ({ route }) => {
  const { user: currentUser } = useCurrentUser();
  const flexSize = useRef(new Animated.Value(0)).current;
  const emptySize = useRef(new Animated.Value(1)).current;

  const messages = useChatMessageSubscriber(
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

  useEffect(startAnimation, [startAnimation]);

  return (
    <Pressable onPress={Keyboard.dismiss} style={style.mainContainer}>
      <Animated.View style={{ flex: emptySize }} />
      <Animated.View style={{ flex: flexSize }}>
        <Screens.Chat.Header.View
          name={route.params.name}
          type={route.params.type}
        />
        <FlatList
          style={{ flex: 1 }}
          data={messages}
          contentContainerStyle={{ paddingHorizontal: scale(10) }}
          renderItem={({ item, index }) => {
            if (+item.senderId === currentUser.id) {
              return (
                <Wrapper.DelayContainer delay={50 * (index + 1)}>
                  <Screens.Chat.Bubble.Outgoing
                    message={item.body}
                    timestamp={item.timestamp}
                    senderId={item.senderId}
                  />
                </Wrapper.DelayContainer>
              );
            }

            return (
              <Wrapper.DelayContainer delay={50 * (index + 1)}>
                <Screens.Chat.Bubble.Incoming
                  message={item.body}
                  timestamp={item.timestamp}
                  senderId={item.senderId}
                />
              </Wrapper.DelayContainer>
            );
          }}
          keyExtractor={(item) => `${item.timestamp.toMillis()}-${item.uuid}`}
        />
        <Input
          containerStyle={{
            maxHeight: scale(80),
          }}
          renderErrorMessage={false}
          multiline
        />
      </Animated.View>
    </Pressable>
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
