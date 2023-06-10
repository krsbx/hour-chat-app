import { Text } from '@rneui/base';
import React, { useMemo } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import { FONT_SIZE } from '../../../constants/fonts';
import STYLES from '../../../styles';
import { flattenStyle } from '../../../styles/factory';
import { COLOR_PALETTE, opacityColor } from '../../../utils/theme';

const CodeContainer: React.FC<Props> = ({
  value,
  length,
  index,
  isFocus,
  maxLength,
  ...props
}) => {
  const containerStyle = useMemo(() => {
    const isCurrent = index === length;
    const isLast = index === (maxLength ?? 0) - 1;
    const isComplete = length === (maxLength ?? 0);

    const isFocused = isCurrent || (isLast && isComplete);

    const style: StyleProp<ViewStyle>[] = [
      STYLES.INPUTS.INPUT,
      containerBasicStyle,
      {
        backgroundColor:
          isFocused && isFocus
            ? opacityColor(COLOR_PALETTE.NEUTRAL_40, 0.5)
            : 'transparent',
      },
    ];

    return style;
  }, [index, isFocus, length, maxLength]);

  return (
    <Pressable style={containerStyle} {...props}>
      <Text
        style={[STYLES.LABELS.DEFAULT_TEXT, { fontSize: FONT_SIZE.MEDIUM }]}
      >
        {value ?? ''}
      </Text>
    </Pressable>
  );
};

const containerBasicStyle = flattenStyle({
  width: scale(40),
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

type Props = PressableProps & {
  value?: string | number;
  length?: number;
  index: number;
  isFocus: boolean;
  maxLength: number;
};

export default CodeContainer;
