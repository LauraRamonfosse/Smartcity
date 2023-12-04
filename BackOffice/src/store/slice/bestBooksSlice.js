import { createSlice } from '@reduxjs/toolkit';

  
// Create the books slice
const bestBooksSlice = createSlice({
    name: 'books',
    initialState: {
        bestBooks: [],
        status: null,
        error: null
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setBestBooks: (state, action) => {
            state.bestBooks = action.payload;
        }
    },
});

// Export actions
export const { setBestBooks } = bestBooksSlice.actions;

// Export reducer
export default bestBooksSlice.reducer;
