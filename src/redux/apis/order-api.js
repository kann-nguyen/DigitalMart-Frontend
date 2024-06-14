import { createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../authAxios";
import {
  getOrder,
  updateOrderFake,
  getAllFakeOrder,
} from "../fake-apis/order-fake-api";
import { pause, SERVER } from "../config";
import axios from "axios";

export const getOrderOfUser = createAsyncThunk(
  "get-order-of-user",
  async (_, { rejectWithValue }) => {
    const response = await authAxios.get("order");
    if (response.status < 200 || response.status >= 300) {
      rejectWithValue(response);
    }
    return response.data;
    // await pause(1000);
    // return getOrder();
  }
);

export const getAllOrder = createAsyncThunk(
  "get-all-order",
  async (_, { rejectWithValue }) => {
    const response = await authAxios.get("order/all");
    if (response.status < 200 || response.status >= 300) {
      rejectWithValue(response);
    }
    console.log(response.data);
    return response.data;
    // try {
    //   return getAllFakeOrder();
    // } catch (error) {
    //   return rejectWithValue(error);
    // }
  }
);

export const updateOrderOfUser = createAsyncThunk(
  "update-order-of-user",
  async (data, { rejectWithValue }) => {
    try {
      return updateOrderFake(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "get-order-by-id",
  async (id, { rejectWithValue }) => {
    const response = await axios.get(`${SERVER}/order/${id}`);
    if (response.status < 200 || response.status >= 300) {
      rejectWithValue(response);
    }
    return response.data;
  }
);
