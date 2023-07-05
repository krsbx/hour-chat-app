import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import { getPersistConfig } from 'redux-deep-persist';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { applyInterceptors } from './axios';
import * as reducers from './reducers';

const rootReducer = combineReducers(reducers);

const persistConfig = getPersistConfig({
  key: 'hour-chat',
  storage: AsyncStorage,
  whitelist: ['auth', 'resources.users', 'encryption', 'queue', 'lastMessage'],
  rootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

type AppDispatch = typeof store.dispatch;
type AppState = ReturnType<typeof store.getState>;

export type { AppDispatch, AppState };
export { store, persistor };

applyInterceptors(store.dispatch, store.getState);
