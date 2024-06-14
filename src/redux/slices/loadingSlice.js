import { createSlice } from "@reduxjs/toolkit";
import { createProduct } from "../apis/product-api";

const initialValue = {
    loading: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState: initialValue,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {

    }
})

export const { setLoading } = loadingSlice.actions;
export const loadingReducers = loadingSlice.reducer;