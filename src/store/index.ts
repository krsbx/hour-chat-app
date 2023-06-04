import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { applyInterceptors } from './axios';
import * as reducers from './reducers';

const persistedReducer = persistReducer(
  {
    key: 'hour-chat',
    storage: AsyncStorage,
    whitelist: ['auth'],
  },
  combineReducers(reducers)
);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

type AppDispatch = typeof store.dispatch;
type AppState = ReturnType<typeof store.getState>;

export type { AppDispatch, AppState };
export { store, persistor };

applyInterceptors(store.dispatch, store.getState);
