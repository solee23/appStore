import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getNewProduct = createAsyncThunk('product/newProducts', async(data, {rejectWithValue}) => {
    const response = await apis.getProduct({sort: '-createdAt'});
    if(!response.success) return rejectWithValue(response);
    return response.data
})