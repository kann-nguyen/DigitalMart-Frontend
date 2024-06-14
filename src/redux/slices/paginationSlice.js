import { createSlice } from "@reduxjs/toolkit";
import { getAllProduct } from "../apis/product-api";

const initialValue = {
    totalPages: 0,
    page: 0,
    hasPrevPage: false,
    hasNextPage: false
}

export const paginateSlice = createSlice({
    name: 'paginates',
    initialState: initialValue,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page
            state.hasNextPage = action.payload.hasNextPage
            state.hasPrevPage = action.payload.hasPrevPage
        })
    }
})

export const { } = paginateSlice.actions;
export const paginateReducers = paginateSlice.reducer;