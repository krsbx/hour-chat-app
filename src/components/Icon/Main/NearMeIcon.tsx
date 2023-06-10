import React from 'react';
import { scale } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR_PALETTE } from '../../../utils/theme';

const NearMeIcon: React.FC<Props> = ({ focused, size }) => {
  return (
    <MaterialIcons
      name="location-pin"
      size={scale(size * (focused ? 0.8 : 0.7))}
      color={focused ? COLOR_PALETTE.BLUE_60 : COLOR_PALETTE.NEUTRAL_70}
    />
  );
};

type Props = HourChat.Navigation.TabIcon;

export default NearMeIcon;
