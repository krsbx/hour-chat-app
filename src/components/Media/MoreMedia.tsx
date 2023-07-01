import { ScreenWidth } from '@rneui/base';
import React from 'react';
import { View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { flattenStyle } from '../../styles/factory';
import { COLOR_PALETTE } from '../../utils/theme';

const MoreMedia: React.FC = () => {
  return (
    <View style={style}>
      <Entypo
        name="circle-with-plus"
        size={ScreenWidth * 0.15}
        color={COLOR_PALETTE.WHITE}
      />
    </View>
  );
};

const style = flattenStyle({
  width: ScreenWidth * 0.25,
  aspectRatio: 1 / 1,
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
});

export default MoreMedia;
