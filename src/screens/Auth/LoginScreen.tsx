import React from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/themed';
import Config from 'react-native-config';

function LoginScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button title="Login" onPress={() => console.log(Config.API_URL)} />
    </View>
  );
}

export default LoginScreen;
