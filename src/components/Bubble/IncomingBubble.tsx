import { ScreenWidth, Text } from '@rneui/base';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Icon } from '..';
import useCachedUserData from '../../hooks/caches/useCachedUserData';
import useTimestamp from '../../hooks/common/useTimestamp';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';
import FileMessage from './FileMessage';
import MessageBody from './MessageBody';

const IncomingBubble: React.FC<Props> = ({
  body,
  files,
  timestamp,
  senderId,
}) => {
  const left = useRef(new Animated.Value(-ScreenWidth)).current;
  const { fullName, user } = useCachedUserData(senderId);
  const datetime = useTimestamp(timestamp);

  const startAnimation = useCallback(() => {
    Animated.timing(left, {
      toValue: 0,
      useNativeDriver: false,
      duration: 500,
      easing: Easing.inOut(Easing.circle),
    }).start();
  }, [left]);

  useEffect(() => {
    if (!user) return;

    startAnimation();
  }, [startAnimation, user]);

  if (!user) return null;

  return (
    <Animated.View style={[style.mainContainer, { left }]}>
      <View style={style.avatarContainer}>
        <Icon.DefaultAvatar name={fullName} user={user} size={scale(35)} />
      </View>
      <View style={style.messageTail} />
      <View style={style.container}>
        <Text style={[STYLES.LABELS.DEFAULT_TEXT, style.username]}>
          {fullName}
        </Text>
        <View>
          <FileMessage files={files} incoming />
          <MessageBody body={body} incoming />
        </View>
        <Text style={style.timestamp}>{datetime}</Text>
      </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    padding: scale(5),
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  container: {
    minWidth: scale(ScreenWidth * 0.25),
    maxWidth: scale(ScreenWidth * 0.75),
    backgroundColor: COLOR_PALETTE.NEUTRAL_30,
    padding: scale(10),
    borderRadius: scale(12),
    borderBottomLeftRadius: 0,
  },
  username: {
    fontWeight: 'bold',
    color: COLOR_PALETTE.NEUTRAL_100,
  },
  messageTail: {
    backgroundColor: COLOR_PALETTE.NEUTRAL_30,
    width: scale(10),
    height: scale(10),
    borderTopLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
    transform: [
      {
        translateY: scale(2.5),
      },
      {
        translateX: scale(5),
      },
    ],
  },
  timestamp: {
    fontSize: 10,
    color: COLOR_PALETTE.NEUTRAL_100,
    paddingTop: scale(5),
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

export default IncomingBubble;
