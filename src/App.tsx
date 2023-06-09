import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigations from './navigations';
import { persistor, store } from './store';
import { navigationRef } from './utils/navigation';
import { handleBackgroundNotification } from './utils/notifications';

handleBackgroundNotification();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider style={{ flex: 1 }}>
          <NavigationContainer ref={navigationRef}>
            <Navigations.MainStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
