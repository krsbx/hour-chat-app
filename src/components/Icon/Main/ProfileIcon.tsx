import React from 'react';
import { scale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOR_PALETTE } from '../../../utils/theme';

const ProfileIcon: React.FC<Props> = ({ focused, size }) => {
  return (
    <FontAwesome
      name="user"
      size={scale(size * (focused ? 0.75 : 0.7))}
      color={focused ? COLOR_PALETTE.BLUE_60 : COLOR_PALETTE.NEUTRAL_70}
    />
  );
};

type Props = HourChat.Navigation.TabIcon;

export default ProfileIcon;
