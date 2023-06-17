import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { Icon } from '..';
import { COLOR_PALETTE } from '../../utils/theme';
import TabBarButton from './TabBarButton';

const CreateStory: React.FC<BottomTabBarButtonProps> = (props) => {
  const isOnFocus = useIsFocused();

  return (
    <TabBarButton
      {...props}
      style={{
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon.Main.CreateStory
        color={COLOR_PALETTE.BLUE_10}
        focused={isOnFocus}
        size={55}
      />
    </TabBarButton>
  );
};

export default CreateStory;
