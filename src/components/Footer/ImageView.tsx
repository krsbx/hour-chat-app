import { Text } from '@rneui/base';
import React from 'react';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { FONT_SIZE } from '../../constants/fonts';
import { COLOR_PALETTE } from '../../utils/theme';

const ImageView: React.FC<Props> = ({ text }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: COLOR_PALETTE.WHITE,
          marginBottom: scale(25),
          fontSize: scale(FONT_SIZE.EXTRA_EXTRA_SMALL),
        }}
      >
        {text}
      </Text>
    </View>
  );
};

type Props = {
  text: string;
  imageIndex: number;
};

export default ImageView;
