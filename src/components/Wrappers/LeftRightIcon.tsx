import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import STYLES from '../../styles';

const LeftRightIcon: React.FC<Props> = ({
  leftIcon,
  leftIconContainerStyle,
  rightIcon,
  rightIconContainerStyle,
  children,
}) => {
  return (
    <React.Fragment>
      {leftIcon && (
        <View style={[STYLES.CONTAINERS.ICON, leftIconContainerStyle]}>
          {leftIcon}
        </View>
      )}
      {children}
      {rightIcon && (
        <View style={[STYLES.CONTAINERS.ICON, rightIconContainerStyle]}>
          {rightIcon}
        </View>
      )}
    </React.Fragment>
  );
};

type Props = {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export default LeftRightIcon;
