import { Input, InputProps } from '@rneui/themed';
import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Labels } from '..';
import STYLES from '../../styles';
import { COLOR_PALETTE } from '../../utils/theme';

const InputField = React.forwardRef<TextInput, Props>(
  ({ isRequired, onChangeText, ...props }, ref) => {
    const label = props.label && (
      <Labels.RequiredLabel
        style={props.labelStyle}
        children={props.label}
        isRequired={isRequired}
      />
    );

    const inputStyle = useMemo(() => {
      const styles: StyleProp<TextStyle>[] = [STYLES.INPUTS.INPUT];

      if (props.errorMessage || props.isError) styles.push(STYLES.INPUTS.ERROR);
      if (props.isValid) styles.push(STYLES.INPUTS.VALID);

      return styles;
    }, [props.errorMessage, props.isValid, props.isError]);

    const errorStyle = useMemo(() => {
      const styles: StyleProp<TextStyle>[] = [STYLES.ERRORS.ERROR];

      if (props.errorStyle) styles.push(props.errorStyle);

      return styles;
    }, [props.errorStyle]);

    return (
      <Input
        inputStyle={inputStyle}
        inputContainerStyle={style.inputContainer}
        disabledInputStyle={STYLES.INPUTS.DISABLED}
        placeholderTextColor={COLOR_PALETTE.PLACEHOLDER}
        numberOfLines={1}
        renderErrorMessage={!!props.errorMessage}
        errorStyle={errorStyle}
        {...props}
        onChangeText={(...args) =>
          (onChangeText as (...args: string[]) => void)(...args)
        }
        label={label}
        ref={ref as never}
      />
    );
  }
);

const style = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 0,
    marginBottom: scale(5),
  },
});

type Props = Omit<InputProps, 'onChangeText'> & {
  isRequired?: boolean;
  isValid?: boolean;
  isError?: boolean;
  onChangeText?: (...args: string[]) => void;
};

export default InputField;
