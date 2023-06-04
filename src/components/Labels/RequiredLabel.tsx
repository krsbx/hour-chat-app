import { Text, TextProps } from '@rneui/base';
import React, { useMemo } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import STYLES from '../../styles';
import { flattenStyle } from '../../styles/factory';

const RequiredLabel: React.FC<Props> = ({
  isRequired,
  style,
  requiredStyle,
  ...props
}) => {
  const textStyle = useMemo(() => {
    const textStyles: StyleProp<TextStyle>[] = [STYLES.LABELS.REQUIRED_LABEL];

    if (style) textStyles.push(style);

    return textStyles;
  }, [style]);

  const starStyle = useMemo(() => {
    const requiredStyles: StyleProp<TextStyle>[] = [
      STYLES.LABELS.REQUIRED_STAR,
    ];

    if (requiredStyle) requiredStyles.push(requiredStyle);

    return requiredStyles;
  }, [requiredStyle]);

  return (
    <View style={inlineStyle}>
      <Text {...props} style={textStyle} />
      {isRequired && <Text style={starStyle}>*</Text>}
    </View>
  );
};

const inlineStyle = flattenStyle({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginBottom: scale(5),
  columnGap: scale(2),
});

type Props = TextProps & {
  isRequired?: boolean;
  requiredStyle?: StyleProp<TextStyle>;
};

export default RequiredLabel;
