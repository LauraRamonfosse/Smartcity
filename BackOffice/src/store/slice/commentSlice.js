import { createSlice } from '@reduxjs/toolkit';

// Create the comments slice
const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        status: null,
        error: null
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        clearComments: (state) => {
            state.comments = [];
        },
        setComment: (state, action) => {
            state.comments.push(action.payload);
        },
        updateComment: (state, action) => {
            state.comments = state.comments.map((comment) => {
                if (comment.id === action.payload.id) {
                    return {
                        ...comment,
                        ...action.payload
                    };
                } else {
                    return comment;
                }
            });
        },
        deleteComment: (state, action) => {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload.id);
        },
    },
});

export const { setComments, clearComments, setComment, updateComment, deleteComment } = commentsSlice.actions;

// Export reducer
export default commentsSlice.reducer;