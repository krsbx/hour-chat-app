import React, { useMemo } from 'react';
import { scale } from 'react-native-size-matters';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { Text, TextProps } from '@rneui/base';
import STYLES from '../../styles';

const RequiredLabel: React.FC<Props> = ({
  isRequired,
  style,
  requiredStyle,
  ...props
}) => {
  const textStyle = useMemo(() => {
    const textStyles: StyleProp<TextStyle>[] = [STYLES.LABELS.REQUIRED_LABEL];

    if (style) textStyles.push(style);
    if (isRequired) textStyles.push(styles.marginRight);

    return textStyles;
  }, [isRequired, style]);

  const starStyle = useMemo(() => {
    const requiredStyles: StyleProp<TextStyle>[] = [
      STYLES.LABELS.REQUIRED_STAR,
    ];

    if (requiredStyle) requiredStyles.push(requiredStyle);

    return requiredStyles;
  }, [requiredStyle]);

  return (
    <View style={styles.inline}>
      <Text {...props} style={textStyle} />
      {isRequired && <Text style={starStyle}>*</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: scale(5),
  },
  marginRight: {
    marginRight: scale(2),
  },
});

type Props = TextProps & {
  isRequired?: boolean;
  requiredStyle?: StyleProp<TextStyle>;
};

export default RequiredLabel;
