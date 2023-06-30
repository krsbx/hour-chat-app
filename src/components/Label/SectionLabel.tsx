import { Text } from '@rneui/base';
import React from 'react';
import { TextProps } from 'react-native';
import STYLES from '../../styles';
import { flattenStyle } from '../../styles/factory';

const SectionLabel: React.FC<Props> = ({ style, ...props }) => {
  return <Text style={[labelStyle, style]} {...props} />;
};

const labelStyle = flattenStyle({
  ...STYLES.LABELS.DEFAULT_TEXT,
  fontWeight: 'bold',
});

type Props = TextProps;

export default SectionLabel;
