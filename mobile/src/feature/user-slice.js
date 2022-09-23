import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import cache  from '../ultility/cache';

const initialState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user_slice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            cache.store("user", state.user);
        },

        updateUser: (state, action) => {
            state.user = action.payload;
        },

        removeUser: (state, action) => {
            state.user = null;
            cache.remove("user");
        },

        addFavorite: (state, action) => {
            
        },

        removeFavorite: (state, action) => {

        },
    }
});

export const { setUser, updateUser, removeUser, addFavorite, removeFavorite } = userSlice.actions;
export default userSlice.reducer;