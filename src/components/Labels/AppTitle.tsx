import { Text } from '@rneui/base';
import React from 'react';
import { Animated } from 'react-native';
import STYLES from '../../styles';

const AppTitle = () => (
  <Animated.View
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <Text style={STYLES.LABELS.DEFAULT_LARGE}>Hour Chat</Text>
    <Text style={STYLES.LABELS.DEFAULT_TEXT}>Connect You With Everyone</Text>
  </Animated.View>
);

export default AppTitle;
