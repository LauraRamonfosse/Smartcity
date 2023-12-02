import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import bookSlice from './bookSlice';
import userSlice from './userSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

// Configuration de la persistance pour le reducer auth
const authPersistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  books: bookSlice,
  users: userSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
