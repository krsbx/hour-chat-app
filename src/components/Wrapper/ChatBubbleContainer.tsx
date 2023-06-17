import { Text } from '@rneui/base';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { FONT_SIZE } from '../../constants/fonts';
import { isSameDate } from '../../utils/chats/common';
import { COLOR_PALETTE } from '../../utils/theme';

const ChatBubbleContainer: React.FC<Props> = ({ children, prev, current }) => {
  const today = useMemo(() => moment(), []);
  const opacity = useRef(new Animated.Value(0)).current;

  // Same Date => Do not show date
  const isPrevSameDate = useMemo(() => {
    if (!prev) return false;

    return isSameDate(prev, current);
  }, [prev, current]);

  const currDate = useMemo(() => {
    if (isSameDate(current, { timestamp: today } as never)) return 'Today';

    return moment(current.timestamp.toDate()).format('DD/MM/YYYY');
  }, [current, today]);

  const isShouldShowDate = useMemo(
    () => !prev || !isPrevSameDate,
    [prev, isPrevSameDate]
  );

  const startAnimation = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: false,
      duration: 500,
      easing: Easing.inOut(Easing.circle),
    }).start();
  }, [opacity]);

  useEffect(() => {
    if (!isShouldShowDate) return;

    startAnimation();
  }, [isShouldShowDate, startAnimation]);

  if (isShouldShowDate)
    return (
      <View style={style.mainContainer}>
        <Animated.View style={{ opacity }}>
          <Text style={style.date}>{currDate}</Text>
        </Animated.View>
        <View style={style.fullWidth}>{children}</View>
      </View>
    );

  return children;
};

const style = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(5),
  },
  date: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    backgroundColor: COLOR_PALETTE.BLUE_10,
    color: COLOR_PALETTE.WHITE,
    borderRadius: 15,
    fontSize: scale(FONT_SIZE.EXTRA_EXTRA_SMALL),
    textAlign: 'center',
  },
});

type Metadata = HourChat.Chat.PrivateMetadata | HourChat.Chat.GroupMetadata;

type Props = {
  children: JSX.Element;
  prev?: Metadata;
  current: Metadata;
};

export default ChatBubbleContainer;
