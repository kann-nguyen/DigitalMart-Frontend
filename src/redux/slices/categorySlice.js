import { createSlice } from "@reduxjs/toolkit";
import { getAllCategory, createCategory, editCategory } from "../apis/category-api";
import { toast } from "react-toastify";
import { getTenProductPerCategory } from "../apis/product-api";


const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        productOfCategory: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllCategory.pending, (state) => {
            state.isLoading=true;
        })
        .addCase(getAllCategory.fulfilled, (state, action) => {
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.categories = action.payload
        })
        .addCase(getAllCategory.rejected, (state, action) => {
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.categories = action.payload;

            if(state.isError == true) {
                toast.info(action.error);
            }
        })
        .addCase(createCategory.pending, (state) => {
            state.isLoading=true;
        })
        .addCase(createCategory.fulfilled, (state, action) => {
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.categories = action.payload

            if(state.isSuccess == true) {
                toast.info("You create a category successfully!");
                window.location.href = '/admin/category';
            }
        })
        .addCase(createCategory.rejected, (state, action) => {
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.categories = action.payload;

            if(state.isError == true) {
                toast.info("This name is existed.")
            }
        })
        .addCase(editCategory.pending, (state) => {
            state.isLoading=true;
        })
        .addCase(editCategory.fulfilled, (state, action) => {
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.categories = action.payload
        })
        .addCase(editCategory.rejected, (state, action) => {
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.categories = action.payload;

            if(state.isError == true) {
                toast.info("This name is existed.")
            }
        })
        .addCase(getTenProductPerCategory.fulfilled, (state, action) => {
            state.productOfCategory = action.payload
        })
    }
})

export const { } = categorySlice.actions;
export const categoryReducers = categorySlice.reducer;