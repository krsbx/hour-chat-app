import React from 'react';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLOR_PALETTE } from '../../../../utils/theme';
import Label from './Label';

const Circle: React.FC<Props> = ({ isActive, step }) => (
  <View
    style={{
      borderRadius: scale(12.5),
      width: scale(25),
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isActive
        ? COLOR_PALETTE.BLUE_70
        : COLOR_PALETTE.NEUTRAL_50,
    }}
  >
    <Label isActive={isActive} step={step} />
  </View>
);

type Props = {
  isActive: boolean;
  step: number;
};

export default Circle;
