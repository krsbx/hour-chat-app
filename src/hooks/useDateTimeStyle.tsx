import { useMemo } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import STYLES from '../styles';

const useDateTimeStyle = ({
  containerStyle,
  inputStyle,
  disabled,
  isValidDate,
  placeholder,
}: Props) => {
  const style = useMemo(() => {
    const inputStyles: StyleProp<ViewStyle>[] = [STYLES.INPUTS.DATE_TIME];
    const textStyles: StyleProp<TextStyle>[] = [STYLES.LABELS.DATE_TIME];
    const containerStyles: StyleProp<ViewStyle>[] = [
      STYLES.CONTAINERS.DATE_TIME,
    ];

    if (disabled) inputStyles.push(STYLES.INPUTS.DISABLED);
    if (inputStyle) inputStyles.push(inputStyle);
    if (containerStyle) containerStyles.push(containerStyle);
    if (!isValidDate && placeholder) textStyles.push(STYLES.LABELS.PLACEHOLDER);

    return { inputStyles, textStyles, containerStyles };
  }, [disabled, isValidDate, placeholder, containerStyle, inputStyle]);

  return style;
};

type Props = {
  disabled?: boolean;
  isValidDate?: boolean;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
};

export default useDateTimeStyle;
