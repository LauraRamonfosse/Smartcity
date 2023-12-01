import { createSlice } from '@reduxjs/toolkit';
import { getAllBooks  } from '../API/book.js';


// create a slice for books
// Async thunk to fetch all books
export const fetchBookData = async(token) =>{
    
    try {
        const bookDataRows = [];
        const books = await getAllBooks(token);
        books.forEach(book => {
            bookDataRows.push([
                {type: 'text', content: book.isbn},
                {type: 'text', content: book.title},
                {type: 'text', content: book.rating},
                {type: 'text', content: book.author},
                {type: 'text', content: book.illustrator? book.illustrator : "none"},
                {type: 'text', content: book.description},
                {type: 'text', content: book.country},
                {type: 'text', content: book.genre},
                {type: 'text', content: book.released_year},
                {type: 'text', content: book.pages},
                {type: 'text', content: book.publishing_house},
                {type: 'text', content: book.img_path},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);

            dispatch(setBooks(bookDataRows));
        });
        
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};
  
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
