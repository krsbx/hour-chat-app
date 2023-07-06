import { Text } from '@rneui/base';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';
import { DropdownProps } from 'react-native-element-dropdown/src/components/Dropdown/model';
import { scale } from 'react-native-size-matters';
import { Label } from '..';
import { FONT_SIZE } from '../../constants/fonts';
import STYLES from '../../styles';
import { COLOR_PALETTE, opacityColor } from '../../utils/theme';

const Dropdown = <T,>({
  label,
  isRequired,
  isError,
  isValid,
  errorMessage,
  ...props
}: Props<T>) => {
  const styles = useMemo(() => {
    const styles: StyleProp<ViewStyle>[] = [style.style];

    if (isValid) styles.push(STYLES.INPUTS.VALID);
    if (isError) styles.push(STYLES.INPUTS.ERROR);

    return styles;
  }, [isValid, isError]);

  return (
    <View style={[STYLES.INPUTS.DEFAULT_PADDING, style.container]}>
      {label && (
        <Label.RequiredLabel isRequired={isRequired}>
          {label}
        </Label.RequiredLabel>
      )}
      <RNDropdown<T>
        style={styles}
        placeholderStyle={STYLES.LABELS.PLACEHOLDER}
        activeColor={opacityColor(COLOR_PALETTE.NEUTRAL_20, 0.7)}
        itemContainerStyle={style.itemContainer}
        selectedTextStyle={style.itemText}
        itemTextStyle={style.itemText}
        {...props}
      />
      {isError && !!errorMessage && (
        <Text style={STYLES.ERRORS.ERROR_DATE}>{errorMessage}</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginBottom: scale(5),
  },
  style: {
    ...STYLES.INPUTS.INPUT,
    height: scale(40),
  },
  itemContainer: {
    height: scale(48),
  },
  itemText: {
    color: COLOR_PALETTE.NEUTRAL_90,
    fontSize: scale(FONT_SIZE.EXTRA_SMALL),
  },
});

type Props<T> = DropdownProps<T> & {
  label?: string;
  isRequired?: boolean;
  isValid?: boolean;
  isError?: boolean;
  errorMessage?: string;
};

export default Dropdown;
