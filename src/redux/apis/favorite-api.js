import { createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../authAxios";
import { SERVER } from "../config";

export const getFavorites = createAsyncThunk(
    'get-favorites',
    async (_, { rejectWithValue }) => {
        const response = await authAxios.get(`${SERVER}/favorite`);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)

export const likeProduct = createAsyncThunk(
    'like-product',
    async (data, { rejectWithValue }) => {
        const response = await authAxios.post(`${SERVER}/favorite`, data);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)

export const unlikeProduct = createAsyncThunk(
    'unlike-product',
    async (productId, { rejectWithValue }) => {
        const response = await authAxios.delete(`${SERVER}/favorite/${productId}`);
        if (response.status < 200 || response.status >= 300) {
            console.error("Error response:", response); // Debugging lo
            rejectWithValue(response);
        }
        console.log("Successfully unliked product:", response.data); // Debugging log
        return response.data;
    }
)