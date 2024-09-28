import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser : null,
    error : null,
    loading : false 
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{            // logic
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {    // action is information we get back and we want to add
            state.currentUser = action.payload;   // user data is payload
            state.loading = false;
            state.error = null;
        },
        signInFailure : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;
// we export this reducers
export default userSlice.reducer;  // we renamme this userReducer in store.js 