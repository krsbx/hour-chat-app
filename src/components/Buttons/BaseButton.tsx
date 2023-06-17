import { Button, ButtonProps } from '@rneui/themed';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const BaseButton: React.FC<Props> = ({
  buttonStyle: _buttonStyle,
  titleStyle: _titleStyle,
  ...props
}) => {
  const buttonStyle = useMemo(() => {
    const styles: StyleProp<ViewStyle>[] = [style.buttonStyle];

    if (_buttonStyle) styles.push(_buttonStyle);

    return styles;
  }, [_buttonStyle]);

  const titleStyle = useMemo(() => {
    const styles: StyleProp<TextStyle>[] = [
      STYLES.LABELS.DEFAULT_TEXT,
      { color: COLOR_PALETTE.WHITE },
    ];
    if (_titleStyle) styles.push(_titleStyle);

    return styles;
  }, [_titleStyle]);

  return (
    <Button buttonStyle={buttonStyle} titleStyle={titleStyle} {...props} />
  );
};

const style = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: scale(25),
    borderRadius: scale(100),
    backgroundColor: COLOR_PALETTE.BLUE_10,
  },
});

type Props = ButtonProps;

export default BaseButton;
