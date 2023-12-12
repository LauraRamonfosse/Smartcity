import { configureStore } from '@reduxjs/toolkit';
import bookSlice from './bookSlice';

export const store = configureStore({
    reducer:{
        books: bookSlice.reducer,
    }
})
