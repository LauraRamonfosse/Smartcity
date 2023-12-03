import { createSlice } from '@reduxjs/toolkit';



// Create the users slice
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: null,
        error: null
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        clearUsers: (state) => {
            state.users = [];
        },
        setUser: (state, action) => {
            state.users.push(action.payload);
        },
        updateUser: (state, action) => {
            state.users = state.users.map((user) => {
                if (user.id === action.payload.id) {
                    return {
                        ...user,
                        ...action.payload
                    };
                } else {
                    return user;
                }
            });
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload.id);
        }
    }
});

export const { setUsers, clearUsers, setUser, updateUser, deleteUser } = usersSlice.actions;

// Export reducer
export default usersSlice.reducer;