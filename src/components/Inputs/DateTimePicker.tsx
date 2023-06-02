import { Text } from '@rneui/base';
import _ from 'lodash';
import moment from 'moment';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import DatePicker, { DatePickerProps } from 'react-native-date-picker';
import { Wrappers } from '..';
import useDateTimeStyle from '../../hooks/useDateTimeStyle';
import { RequiredLabel } from '../Labels';

const DateTimePicker: React.FC<Props> = ({
  value,
  placeholder,
  label,
  isRequired,
  leftIcon,
  leftIconContainerStyle,
  rightIcon,
  rightIconContainerStyle,
  containerStyle,
  inputStyle,
  onConfirm: onConfirmProps,
  onDateChange: onDateChangeProps,
  disabled,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const date = useMemo(() => {
    if (typeof value === 'string' && !_.isEmpty(value)) return new Date(value);

    return null;
  }, [value]);
  const isValidDate = useMemo(() => moment(date).isValid(), [date]);

  const format = useMemo(() => {
    switch (props.mode) {
      case 'date':
        return 'DD/MM/YYYY';
      case 'time':
        return 'hh:mm A';
      default:
        return 'DD/MM/YYYY hh:mm A';
    }
  }, [props.mode]);

  const style = useDateTimeStyle({
    containerStyle,
    disabled,
    inputStyle,
    isValidDate,
    placeholder,
  });

  const onPress = useCallback(() => {
    if (disabled) return;

    setIsOpen(true);
  }, [disabled, setIsOpen]);

  const onCancel = useCallback(() => {
    if (disabled) return;

    setIsOpen(false);
  }, [disabled, setIsOpen]);

  const onConfirm = useCallback(
    (date: Date) => {
      onConfirmProps?.(date);
      setIsOpen(false);
    },
    [onConfirmProps, setIsOpen]
  );

  const onDateChange = useCallback(
    (date: Date) => onDateChangeProps?.(date),
    [onDateChangeProps]
  );

  return (
    <React.Fragment>
      <View style={style.containerStyles}>
        {label && (
          <RequiredLabel isRequired={isRequired}>{label}</RequiredLabel>
        )}
        <TouchableOpacity
          style={style.inputStyles}
          activeOpacity={1}
          onPress={onPress}
        >
          <Wrappers.LeftRightIcon
            leftIcon={leftIcon}
            leftIconContainerStyle={leftIconContainerStyle}
            rightIcon={rightIcon}
            rightIconContainerStyle={rightIconContainerStyle}
          >
            <Text style={style.textStyles}>
              {isValidDate ? moment(date).format(format) : placeholder ?? ''}
            </Text>
          </Wrappers.LeftRightIcon>
        </TouchableOpacity>
      </View>{' '}
      <DatePicker
        open={isOpen}
        date={date ?? new Date()}
        onCancel={onCancel}
        onConfirm={onConfirm}
        onDateChange={onDateChange}
        modal
        {...props}
      />
    </React.Fragment>
  );
};

type Props = Omit<DatePickerProps, 'open' | 'onCancel' | 'date'> & {
  value?: string | null;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  isRequired?: boolean;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
};

export default DateTimePicker;
