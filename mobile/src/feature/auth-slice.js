import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import cache from '../ultility/cache';

const initialState = {
    token: null,
}

const authSlice = createSlice({
    name: 'auth-slice',
    initialState,
    reducers: {
        login: (state, action) => {
            cache.store("access_token");
            state.token = action.payload;
        },
        
        logout: (state, action) => {
            cache.remove("access_token");
            state.token = null;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;