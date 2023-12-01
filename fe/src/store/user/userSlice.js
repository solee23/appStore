import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncAction'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggin: false,
        userDetail: null,
        token: null
    },
    reducers: {
        logIn: (state, action) => {
            state.isLoggin = action.payload.isLoggin
            state.token = action.payload.token
        },
        logOut: (state, action) => {
            state.isLoggin = false
            state.token = null
        }
    },
    extraReducers: (builder) => {

        builder.addCase(actions.getUser.pending, (state) => {
            state.isLoading = false;
        });

        builder.addCase(actions.getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userDetail = action.payload;

        });

        builder.addCase(actions.getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});

export const { logIn, logOut } = userSlice.actions

export default userSlice.reducer