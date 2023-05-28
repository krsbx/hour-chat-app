import React from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/themed';
import { COLOR_PALETTE } from '../../utils/theme';

function LoginScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR_PALETTE['teal.100'],
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button title="Login" />
    </View>
  );
}

export default LoginScreen;
