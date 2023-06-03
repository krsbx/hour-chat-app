import { Text } from '@rneui/base';
import React from 'react';
import { Animated } from 'react-native';
import { scale } from 'react-native-size-matters';
import { FONT_SIZE } from '../../constants/fonts';

const AppTitle = () => (
  <Animated.View
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <Text style={{ fontSize: scale(FONT_SIZE.LARGE), fontWeight: 'bold' }}>
      Hour Chat
    </Text>
    <Text>Connect You With Everyone</Text>
  </Animated.View>
);

export default AppTitle;
