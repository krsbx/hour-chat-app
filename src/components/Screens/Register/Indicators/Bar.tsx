import React from 'react';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLOR_PALETTE } from '../../../../utils/theme';

const Bar: React.FC<Props> = ({ progress, width }) => (
  <View
    style={{
      width: scale(width),
      height: scale(10),
      backgroundColor: COLOR_PALETTE.NEUTRAL_50,
    }}
  >
    <View
      style={{
        width: `${progress}%`,
        height: scale(10),
        backgroundColor: COLOR_PALETTE.BLUE_70,
      }}
    />
  </View>
);

type Props = {
  progress: number;
  width: number;
};

export default Bar;
