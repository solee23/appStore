import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncAction'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isLoading: false,
        errorMessage: '',
        category: null,
    },

    reducers: {

    },


    extraReducers: (builder) => {
        // Bắt đầu thực hiện action login (Promise pending)
        //   builder.addCase(login.pending, (state) => {
        //     // Bật trạng thái loading
        //     state.isLoading = true;
        //   });


        builder.addCase(actions.getCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.category = action.payload;
        });

        builder.addCase(actions.getCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});

export const { } = appSlice.actions

export default appSlice.reducer