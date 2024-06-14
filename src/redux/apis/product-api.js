import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../config";
import authAxios from "../authAxios";

export const createProduct = createAsyncThunk(
    'create-product',
    async (data, { rejectWithValue }) => {
        const response = await authAxios.post(`product`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        return response.data;
    }
)

export const getProductByCategory = createAsyncThunk(
    'get-product-by-category',
    async (category, { rejectWithValue }) => {
        const response = await axios.get(`${SERVER}/product/category/${category}`);
        console.log(response.data);
        return response.data;
    }
)

export const getAllProduct = createAsyncThunk(
    'get-all-product',
    async () => {
        const response = await axios.get(`${SERVER}/product/all`);
        console.log(response.data);
        return response.data
    }
)

export const getTenProductPerCategory = createAsyncThunk(
    'get-ten-product-per-category',
    async (_, { rejectWithValue }) => {
        const response = await axios.get(`${SERVER}/product/ten-product-per-category`);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response)
        }
        return response.data;
    }
)

export const searchProduct = createAsyncThunk(
    'search-product',
    async (input, { rejectWithValue }) => {
        const response = await axios.get(`${SERVER}/product/search/${input}`);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response)
        }
        return response.data;
    }
)

export const getProductDetail = createAsyncThunk(
    'get-product-detail',
    async (productId, { rejectWithValue }) => {
        const response = await axios.get(`${SERVER}/product/product-detail/${productId}`);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response)
        }
        return response.data;
    }
)

export const getAllProductByAdmin = createAsyncThunk(
    'get-all-product-by-admin',
    async (_, { rejectWithValue }) => {
        const response = await authAxios.get(`product/all-by-admin`);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response)
        }
        return response.data
    }
)

export const updateProduct = createAsyncThunk(
    'update-product',
    async ({ data, id }, { rejectWithValue }) => {
        const response = await authAxios.put(`product/${id}`, data, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        });
        console.log(response);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response)
        }
        return response.data
    }
)