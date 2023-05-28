import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import * as reducers from './reducers';

const persistedReducer = persistReducer(
  {
    key: 'hour-chat',
    storage: AsyncStorage,
    whitelist: [],
  },
  combineReducers(reducers)
);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

type AppDispatch = typeof store.dispatch;
type AppState = ReturnType<typeof store.getState>;

export type { AppDispatch, AppState };
export { store, persistor };
