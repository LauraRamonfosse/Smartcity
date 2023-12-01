import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers  } from '../API/user.js';

// create a slice for users
// Async thunk to fetch all users
export const fetchUserData = async (token) => {
    try {
        const userDataRows = [];
        const users = await getAllUsers(token);
        users.forEach(user => {
            userDataRows.push([
                {type: 'text', content: user.id},
                {type: 'text', content: user.username},
                {type: 'text', content: user.email_address},
                {type: 'text', content: user.password},
                {type: 'text', content: user.country},
                {type: 'text', content: user.phone_number},
                {type: 'boolean', content: user.news_letter},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);
        });
        console.log("userDataRows from user slice", userDataRows);
        return userDataRows;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

// Create the users slice
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersDataRows: [],
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