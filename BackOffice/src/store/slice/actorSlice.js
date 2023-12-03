import { createSlice } from '@reduxjs/toolkit';

// Create the actors slice
const actorsSlice = createSlice({
    name: 'actors',
    initialState: {
        actors: [],
        status: null,
        error: null
    },
    reducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        setActors: (state, action) => {
            state.actors = action.payload;
        },
        clearActors: (state) => {
            state.actors = [];
        },
        setActor: (state, action) => {
            state.actors.push(action.payload);
        },
        updateActor: (state, action) => {
            state.actors = state.actors.map((actor) => {
                if (actor.id === action.payload.id) {
                    return {
                        ...actor,
                        ...action.payload
                    };
                } else {
                    return actor;
                }
            });
        },
        deleteActor: (state, action) => {
            state.actors = state.actors.filter((actor) => actor.id !== action.payload.id);
        },
    },
});

export const { setActors, clearActors, setActor, updateActor, deleteActor } = actorsSlice.actions;

// Export reducer
export default actorsSlice.reducer;