import { Text } from '@rneui/base';
import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapMarker, MapMarkerProps, Marker } from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from '../..';
import useUserGenderIcon from '../../../hooks/useUserGenderIcon';
import STYLES from '../../../styles';
import { createFullName } from '../../../utils/common';
import { COLOR_PALETTE } from '../../../utils/theme';

const User = React.forwardRef<MapMarker | null, Props>(
  ({ user, onPress, ...props }, ref) => {
    const { iconColor, iconName } = useUserGenderIcon(user);

    return (
      <Marker {...props} onPress={onPress} ref={ref}>
        <Icon.DefaultAvatar user={user} />
        <View style={style.gender}>
          <Ionicons name={iconName} size={scale(15)} color={iconColor} />
        </View>
        <Text style={STYLES.LABELS.DEFAULT_TEXT}>
          {_.truncate(createFullName(user), {
            length: 20,
          })}
        </Text>
      </Marker>
    );
  }
);

const style = StyleSheet.create({
  gender: {
    width: scale(25),
    height: scale(25),
    padding: scale(5),
    backgroundColor: COLOR_PALETTE.NEUTRAL_20,
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: scale(-5),
    right: scale(-5),
  },
});

type Props = MapMarkerProps & {
  user: HourChat.Resource.User;
};

export default User;
