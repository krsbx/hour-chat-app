import { ScreenWidth, Text } from '@rneui/base';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Icon } from '..';
import useChatTimestamp from '../../hooks/useChatTimestamp';
import useCurrentUser from '../../hooks/useCurrentUser';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';
import FileMessage from './FileMessage';
import MessageBody from './MessageBody';

const OutgoingBubble: React.FC<Props> = ({ body, files, timestamp }) => {
  const right = useRef(new Animated.Value(-ScreenWidth)).current;
  const { fullName, user } = useCurrentUser();
  const datetime = useChatTimestamp(timestamp);

  const startAnimation = useCallback(() => {
    Animated.timing(right, {
      toValue: 0,
      useNativeDriver: false,
      duration: 500,
      easing: Easing.inOut(Easing.circle),
    }).start();
  }, [right]);

  useEffect(() => {
    if (!user) return;

    startAnimation();
  }, [startAnimation, user]);

  if (!user) return null;

  return (
    <Animated.View style={[style.mainContainer, { right }]}>
      <View style={style.container}>
        <Text style={[STYLES.LABELS.DEFAULT_TEXT, style.username]}>
          {fullName}
        </Text>
        <View>
          <FileMessage files={files} />
          <MessageBody body={body} />
        </View>
        <Text style={style.timestamp}>{datetime}</Text>
      </View>
      <View style={style.messageTail} />
      <View style={style.avatarContainer}>
        <Icon.DefaultAvatar name={fullName} user={user} size={scale(35)} />
      </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    padding: scale(5),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  container: {
    minWidth: scale(ScreenWidth * 0.25),
    maxWidth: scale(ScreenWidth * 0.75),
    backgroundColor: COLOR_PALETTE.BLUE_10,
    padding: scale(10),
    borderRadius: scale(12),
    borderBottomRightRadius: 0,
  },
  username: {
    fontWeight: 'bold',
    color: COLOR_PALETTE.WHITE,
  },
  messageTail: {
    backgroundColor: COLOR_PALETTE.BLUE_10,
    width: scale(10),
    height: scale(10),
    borderTopRightRadius: scale(10),
    borderBottomLeftRadius: scale(10),
    transform: [
      {
        translateY: scale(2.5),
      },
      {
        translateX: scale(-5),
      },
    ],
  },
  timestamp: {
    fontSize: 10,
    color: COLOR_PALETTE.WHITE,
    textAlign: 'right',
  },
  avatarContainer: {
    transform: [
      {
        translateY: scale(15),
      },
    ],
  },
});

type Props = HourChat.Chat.MessageData;

export default OutgoingBubble;
