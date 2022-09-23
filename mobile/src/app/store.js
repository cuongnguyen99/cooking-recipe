import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../feature/auth-slice';
import userSlice from '../feature/user-slice';

export const store = configureStore({
    reducer: {
        user_slice: userSlice,
        auth_slice: authSlice,
    }
});
