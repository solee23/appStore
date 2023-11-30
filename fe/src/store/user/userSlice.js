import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggin: false,
        current: null,
        token: null
    },
    reducers: {
        regiser: (state, action) => {
            console.log(action);
            state.isLoggin = action.payload.isLoggin
            state.current = action.payload.resData
            state.token = action.payload.token
        }
    },
});

export const { regiser} = userSlice.actions

export default userSlice.reducer