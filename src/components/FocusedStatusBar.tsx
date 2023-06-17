import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';

const FocusedStatusBar = React.forwardRef<StatusBar | null, StatusBarProps>(
  (props, ref) => {
    const isOnFocus = useIsFocused();

    if (!isOnFocus) return null;

    return <StatusBar {...props} ref={ref} />;
  }
);

export default FocusedStatusBar;
