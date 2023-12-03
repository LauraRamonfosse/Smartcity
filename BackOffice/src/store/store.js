import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import bookSlice from './slice/bookSlice';
import userSlice from './slice/userSlice';
import reviewSlice from './slice/reviewSlice';
import commentSlice from './slice/commentSlice';
import roleSlice from './slice/roleSlice';
import actorSlice from './slice/actorSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  auth: authReducer,
  books: bookSlice,
  users: userSlice,
  reviews: reviewSlice,
  comments: commentSlice,
  roles: roleSlice,
  actors: actorSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
