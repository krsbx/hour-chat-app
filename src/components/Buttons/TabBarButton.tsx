import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs/src/types';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const TabBarButton: React.FC<Props> = (props) => {
  return <TouchableOpacity {...props} activeOpacity={0.3} />;
};

type Props = BottomTabBarButtonProps;

export default TabBarButton;
