import { Text } from '@rneui/base';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { FONT_SIZE } from '../../../../constants/fonts';
import { COLOR_PALETTE } from '../../../../utils/theme';

const Label: React.FC<Props> = ({ isActive, step }) => (
  <Text
    style={{
      fontSize: scale(FONT_SIZE.EXTRA_EXTRA_SMALL),
      color: isActive ? COLOR_PALETTE.WHITE : COLOR_PALETTE.BLACK,
    }}
  >
    {step}
  </Text>
);

type Props = {
  isActive: boolean;
  step: number;
};

export default Label;
