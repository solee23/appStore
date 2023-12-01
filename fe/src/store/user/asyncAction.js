import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getUser = createAsyncThunk('app/getOne', async(data, {rejectWithValue}) => {
    const response = await apis.apiUser();
    if(!response.success) return rejectWithValue(response);
    return response.data
})
