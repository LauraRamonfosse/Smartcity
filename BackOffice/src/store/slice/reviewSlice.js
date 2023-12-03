import { createSlice } from '@reduxjs/toolkit';

// Create the reviews slice
const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        status: null,
        error: null
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
        clearReviews: (state) => {
            state.reviews = [];
        },
        setReview: (state, action) => {
            state.reviews.push(action.payload);
        },
        updateReview: (state, action) => {
            state.reviews = state.reviews.map((review) => {
                if (review.id === action.payload.id) {
                    return {
                        ...review,
                        ...action.payload
                    };
                } else {
                    return review;
                }
            });
        },
        deleteReview: (state, action) => {
            state.reviews = state.reviews.filter((review) => review.id !== action.payload.id);
        },
    },
});

export const { setReviews, clearReviews, setReview, updateReview, deleteReview } = reviewsSlice.actions;

// Export reducer
export default reviewsSlice.reducer;