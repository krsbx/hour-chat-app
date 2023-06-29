import { Text } from '@rneui/base';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { scale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import STYLES from '../../styles';
import { flattenStyle } from '../../styles/factory';
import { COLOR_PALETTE } from '../../utils/theme';

const Section: React.FC<Props> = ({ title, style, ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[buttonStyle, style]}
      {...props}
    >
      <Text style={STYLES.LABELS.DEFAULT_TEXT}>{title}</Text>
      <Entypo name="chevron-right" size={scale(15)} />
    </TouchableOpacity>
  );
};

const buttonStyle = flattenStyle({
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  borderBottomWidth: 1,
  paddingVertical: scale(10),
  paddingHorizontal: scale(5),
  borderColor: COLOR_PALETTE.NEUTRAL_40,
  backgroundColor: COLOR_PALETTE.WHITE,
});

type Props = TouchableOpacityProps & { title: string };

export default Section;
