import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigations from './navigations';

function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar animated translucent barStyle={'light-content'} />
        <Navigations.AuthStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
