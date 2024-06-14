import { createSlice } from "@reduxjs/toolkit";
import { getFavorites, likeProduct, unlikeProduct } from "../apis/favorite-api";

const initialValue = {
    favorites: [],
    loading: false,
    error: null
}

export const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: initialValue,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        // getFavorites
        .addCase(getFavorites.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getFavorites.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites = action.payload.items;
        })
        .addCase(getFavorites.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        // likeProduct
        .addCase(likeProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(likeProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites = action.payload.items;
        })
        .addCase(likeProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        // unlikeProduct
        .addCase(unlikeProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(unlikeProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites = action.payload.items;
        })
        .addCase(unlikeProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export const { } = favoriteSlice.actions;
export const favoriteReducers = favoriteSlice.reducer;