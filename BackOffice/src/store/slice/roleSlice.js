import { createSlice } from '@reduxjs/toolkit';

// Create the roles slice
const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        roles: [],
        status: null,
        error: null
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
        clearRoles: (state) => {
            state.roles = [];
        },
        setRole: (state, action) => {
            state.roles.push(action.payload);
        },
        updateRole: (state, action) => {
            state.roles = state.roles.map((role) => {
                if (role.id === action.payload.id) {
                    return {
                        ...role,
                        ...action.payload
                    };
                } else {
                    return role;
                }
            });
        },
        deleteRole: (state, action) => {
            state.roles = state.roles.filter((role) => role.id !== action.payload.id);
        },
    },
});

export const { setRoles, clearRoles, setRole, updateRole, deleteRole } = rolesSlice.actions;

// Export reducer
export default rolesSlice.reducer;