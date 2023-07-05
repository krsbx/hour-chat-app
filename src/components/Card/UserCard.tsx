import { Text } from '@rneui/base';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import { Icon } from '..';
import { FONT_SIZE } from '../../constants/fonts';
import useCachedUserData from '../../hooks/caches/useCachedUserData';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const UserCard: React.FC<Props> = ({ uuid, onPress }) => {
  const maxHeight = useRef(new Animated.Value(0)).current;
  const { fullName, user } = useCachedUserData(uuid);

  const startAnimation = useCallback(() => {
    Animated.parallel([
      Animated.timing(maxHeight, {
        toValue: scale(70),
        duration: 500,
        easing: Easing.circle,
        useNativeDriver: false,
      }),
    ]).start();
  }, [maxHeight]);

  useEffect(() => {
    if (!user) return;

    startAnimation();
  }, [startAnimation, user]);

  if (!user) return null;

  return (
    <Animated.View style={{ maxHeight, overflow: 'hidden' }}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={style.mainContainer}
        onPress={onPress}
      >
        <View style={style.cardContainer}>
          <Icon.DefaultAvatar name={fullName} user={user} size={scale(45)} />
          <Text style={style.fullName}>{fullName}</Text>
        </View>
        <Entypo name="chevron-right" size={scale(15)} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    paddingVertical: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLOR_PALETTE.NEUTRAL_40,
    backgroundColor: COLOR_PALETTE.WHITE,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  fullName: {
    ...STYLES.LABELS.DEFAULT_TEXT,
    fontSize: scale(FONT_SIZE.SMALL),
    fontWeight: 'bold',
  },
});

type Props = HourChat.Chat.PrivateMetadata & {
  onPress?: () => void;
};

export default UserCard;
