import { createSlice } from '@reduxjs/toolkit';

  
// Create the books slice
const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books:[],
        status: null,
        error: null
    },
    reducers: {
        setBooks: (state, action) => {
            state.books.push(action.payload);
        },
    },
});

// Export actions
export const { setBooks } = booksSlice.actions;

// Export reducer
export default booksSlice;
