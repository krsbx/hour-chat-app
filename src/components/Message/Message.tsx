import type { Timestamp } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/base';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { Icon } from '..';
import { CHAT_TYPE } from '../../constants/common';
import { FONT_SIZE } from '../../constants/fonts';
import { CHAT_STACK } from '../../constants/screens';
import useDecryptedChatMessage from '../../hooks/useDecryptedChatMessage';
import { getCurrentEncryption } from '../../store/selectors/encryption';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const Message: React.FC<Props> = ({
  name,
  timestamp: timestampProps,
  body,
  type,
  uuid,
  user,
}) => {
  const navigation =
    useNavigation<
      HourChat.Navigation.ChatStackNavigation<typeof CHAT_STACK.LIST>
    >();
  const config = useSelector(getCurrentEncryption(type, uuid));

  const maxHeight = useRef(new Animated.Value(0)).current;
  const today = useMemo(() => moment(), []);
  const timestamp = useMemo(
    () => moment(timestampProps.toDate()),
    [timestampProps]
  );
  const timestampLabel = useMemo(() => {
    const isInPast = timestamp.isBefore(today, 'days');
    const dayPasses = Math.abs(timestamp.diff(today, 'days'));

    if (isInPast) {
      if (dayPasses === 1) return 'Yesterday';
      if (dayPasses <= 7) return timestamp.format('dddd');

      return timestamp.format('YYYY/MM/DD');
    }

    return timestamp.format('HH:mm');
  }, [timestamp, today]);

  const messageBody = useDecryptedChatMessage(body, config);

  const onPress = useCallback(() => {
    navigation.push(CHAT_STACK.VIEW, {
      type: type,
      uuid: uuid,
      name: name,
    });
  }, [type, uuid, name, navigation]);

  const startAnimation = useCallback(() => {
    Animated.parallel([
      Animated.timing(maxHeight, {
        toValue: scale(60),
        duration: 1000,
        easing: Easing.circle,
        useNativeDriver: false,
      }),
    ]).start();
  }, [maxHeight]);

  useEffect(startAnimation, [startAnimation]);

  return (
    <Animated.View style={{ maxHeight }}>
      <TouchableOpacity
        style={style.container}
        activeOpacity={0.5}
        onPress={onPress}
      >
        <Icon.DefaultAvatar
          name={name}
          user={user}
          noUser={type !== CHAT_TYPE.PRIVATE}
        />
        <View style={{ flex: 1, gap: scale(5) }}>
          <Text style={style.title}>{name}</Text>
          <Text style={STYLES.LABELS.DEFAULT_TEXT}>{messageBody}</Text>
        </View>
        <View>
          <Text style={style.timestamp}>{timestampLabel}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingVertical: scale(10),
    flexDirection: 'row',
    gap: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLOR_PALETTE.NEUTRAL_40,
    backgroundColor: COLOR_PALETTE.WHITE,
  },
  title: {
    ...STYLES.LABELS.DEFAULT_TEXT,
    color: COLOR_PALETTE.NEUTRAL_90,
    fontWeight: 'bold',
  },
  timestamp: {
    ...STYLES.LABELS.DEFAULT_TEXT,
    fontSize: FONT_SIZE.EXTRA_EXTRA_SMALL,
  },
});

type Props = {
  name: string;
  timestamp: Timestamp;
  body: string;
  type: HourChat.Type.ChatType;
  uuid: string;
  user?: HourChat.Resource.User;
};

export default Message;
