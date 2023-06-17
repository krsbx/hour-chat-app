import { Text } from '@rneui/base';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { MapMarker, MapMarkerProps, Marker } from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GENDER } from '../../../constants/resources';
import STYLES from '../../../styles';
import { createFullName } from '../../../utils/common';
import { COLOR_PALETTE } from '../../../utils/theme';

const User = React.forwardRef<MapMarker | null, Props>(
  ({ user, onPress, ...props }, ref) => {
    const iconName = useMemo(() => {
      switch (user.gender) {
        case GENDER.MALE:
          return 'male';

        case GENDER.FEMALE:
          return 'female';

        default:
          return 'male-female';
      }
    }, [user]);

    const iconColor = useMemo(() => {
      switch (user.gender) {
        case GENDER.MALE:
          return COLOR_PALETTE.BLUE_10;

        case GENDER.FEMALE:
          return COLOR_PALETTE.DANGER_PRESSED;

        default:
          return COLOR_PALETTE.ROYAL_BLUE_100;
      }
    }, [user]);

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
