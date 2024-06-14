import { createSlice } from "@reduxjs/toolkit";
import { getInventoryOfProduct } from "../apis/inventory-api";

const initialValue = {
    inventory: null
}

export const inventorySlice = createSlice({
    name: 'inventories',
    initialState: initialValue,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getInventoryOfProduct.fulfilled, (state, action) => {
            state.inventory = action.payload;
        })
    }
})

export const { } = inventorySlice.actions;
export const inventoryReducers = inventorySlice.reducer;