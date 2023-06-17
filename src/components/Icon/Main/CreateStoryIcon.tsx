import React from 'react';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR_PALETTE } from '../../../utils/theme';

const CreateStoryIcon: React.FC<Props> = ({ focused, size }) => {
  return (
    <AntDesign
      name="pluscircle"
      size={scale(size * (focused ? 0.8 : 0.75))}
      color={focused ? COLOR_PALETTE.BLUE_60 : COLOR_PALETTE.NEUTRAL_70}
    />
  );
};

type Props = HourChat.Navigation.TabIcon;

export default CreateStoryIcon;
