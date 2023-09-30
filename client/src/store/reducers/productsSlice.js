import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: null,
};

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async () => {
        const response = await axios.get("http://localhost:5000/api/products");
        return response?.data;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productsFetch.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(productsFetch.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = "success";
            })
            .addCase(productsFetch.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});

export default productsSlice.reducer;
