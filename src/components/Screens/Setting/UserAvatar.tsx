import { Text } from '@rneui/base';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from '../..';
import { FONT_SIZE } from '../../../constants/fonts';
import useUserGenderIcon from '../../../hooks/styles/useUserGenderIcon';
import STYLES from '../../../styles';
import { createFullName } from '../../../utils/common';
import { COLOR_PALETTE, opacityColor } from '../../../utils/theme';

const UserAvatar: React.FC<Props> = ({ user }) => {
  const { iconColor, iconName } = useUserGenderIcon(user);
  const fullName = useMemo(() => createFullName(user), [user]);

  return (
    <View style={style.userContainer}>
      <TouchableOpacity
        style={style.avatarMainContainer}
        onPress={() => console.log('F')}
      >
        <Icon.DefaultAvatar
          containerStyle={style.avatarContainer}
          user={user}
          name={fullName}
          size={scale(100)}
        />
        <View style={style.gender}>
          <Ionicons name={iconName} size={scale(15)} color={iconColor} />
        </View>
      </TouchableOpacity>
      <Text style={style.fullName}>{fullName}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  userContainer: {
    gap: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PALETTE.BLUE_10,
    padding: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLOR_PALETTE.NEUTRAL_40,
  },
  fullName: {
    ...STYLES.LABELS.DEFAULT_TEXT,
    fontSize: scale(FONT_SIZE.SMALL),
    color: COLOR_PALETTE.WHITE,
  },
  gender: {
    width: scale(25),
    height: scale(25),
    padding: scale(5),
    backgroundColor: COLOR_PALETTE.NEUTRAL_20,
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: scale(5),
    right: scale(5),
  },
  avatarContainer: {
    backgroundColor: COLOR_PALETTE.BLUE_30,
    borderColor: opacityColor(COLOR_PALETTE.WHITE, 0.3),
    borderWidth: scale(2),
  },
  avatarMainContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
});

type Props = {
  user: HourChat.Resource.User;
};

export default UserAvatar;
