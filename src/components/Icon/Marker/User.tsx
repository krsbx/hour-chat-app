import { Text } from '@rneui/base';
import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapMarker, MapMarkerProps, Marker } from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useUserGenderIcon from '../../../hooks/useUserGenderIcon';
import STYLES from '../../../styles';
import { createFullName } from '../../../utils/common';
import { COLOR_PALETTE } from '../../../utils/theme';

const User = React.forwardRef<MapMarker | null, Props>(
  ({ user, onPress, ...props }, ref) => {
    const { iconColor, iconName } = useUserGenderIcon(user);

    return (
      <Marker {...props} onPress={onPress} ref={ref}>
        <View style={style.outerContainer}>
          <View style={style.mainContainer}>
            <View style={style.innerContainer}>
              <Ionicons name={iconName} size={scale(18)} color={iconColor} />
            </View>
          </View>
          <Text style={STYLES.LABELS.DEFAULT_TEXT}>
            {_.truncate(createFullName(user), {
              length: 20,
            })}
          </Text>
        </View>
      </Marker>
    );
  }
);

const style = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(5),
  },
  mainContainer: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PALETTE.NEUTRAL_60,
  },
  innerContainer: {
    width: '80%',
    height: '80%',
    borderRadius: scale(30),
    backgroundColor: COLOR_PALETTE.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Props = MapMarkerProps & {
  user: HourChat.Resource.User;
};

export default User;
