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
import useCachedUserData from '../../hooks/useCachedUserData';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const UserCard: React.FC<Props> = ({ uuid, onPress }) => {
  const maxHeight = useRef(new Animated.Value(0)).current;
  const { fullName, user } = useCachedUserData(uuid);

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
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: scale(10),
    paddingHorizontal: scale(5),
    borderColor: COLOR_PALETTE.NEUTRAL_40,
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
