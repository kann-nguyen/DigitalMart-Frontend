import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER } from "../config";
import authAxios from "../authAxios";

export const getInventoryOfProduct = createAsyncThunk(
    'get-inventory-of-product',
    async (productId, { rejectWithValue }) => {
        const response = await axios.get(`${SERVER}/inventory/${productId}`);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)

export const updateInventory = createAsyncThunk(
    'update-inventory',
    async (data, { rejectWithValue }) => {
        const response = await authAxios.put('inventory', data);
        if (response.status < 200 || response.status >= 300) {
            rejectWithValue(response);
        }
        return response.data;
    }
)