import { createSlice } from '@reduxjs/toolkit';

  
// Create the books slice
const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        status: null,
        error: null
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        clearBooks: (state) => {
            state.books = [];
        },
        setBook: (state, action) => {
            state.books.push(action.payload);
        },
        updateBook: (state, action) => {
            state.books = state.books.map((book) => {
                if (book.id === action.payload.id) {
                    return {
                        ...book,
                        ...action.payload
                    };
                } else {
                    return book;
                }
            });
        },
        deleteBook: (state, action) => {
            state.books = state.books.filter((book) => book.id !== action.payload.id);
        },
        setBookStatus: (state, action) => {
            state.status = action.payload;
        },
        setBookError: (state, action) => {
            state.error = action.payload;
        },
    },
});

// Export actions
export const { setBooks, clearBooks, setBook, updateBook, deleteBook, setBookStatus, setBookError } = booksSlice.actions;

// Export reducer
export default booksSlice.reducer;
