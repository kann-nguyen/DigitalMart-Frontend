import { createAsyncThunk } from "@reduxjs/toolkit";
import authAxios from "../authAxios";
import { getBasketFake, updateBasketFake } from "../fake-apis/basket-fake-api";
import { pause } from "../config";
import axios from "axios";

export const getBasket = createAsyncThunk(
  "get-basket",
  async (_, { rejectWithValue }) => {
    const response = await authAxios.get("basket");
    if (response.status < 200 || response.status >= 300) {
      rejectWithValue(response);
    }
    return response.data;

    // await pause(1000);
    // return getBasketFake();
  }
);

export const updateBasket = createAsyncThunk(
  "update-basket",
  async (data, { rejectWithValue }) => {
    const response = await authAxios.put("basket", data);
    if (response.status < 200 || response.status >= 300) {
      rejectWithValue(response);
    }
    return response.data;
  }

  // async (data, { rejectWithValue }) => {
  //   try {
  //     // await pause(1000);
  //     return updateBasketFake(data);
  //   } catch (error) {
  //     return rejectWithValue(error);
  //   }
  // }
);

export const checkoutBasket = createAsyncThunk(
  "checkout-basket",
  async (data, { rejectWithValue }) => {
    const response = await authAxios.post("basket/checkout", data);
    if (response.status < 200 || response.status >= 300) {
      rejectWithValue(response);
    }
    const vnpUrl = response.data;
    window.location.href = vnpUrl;
  }
);


//asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss