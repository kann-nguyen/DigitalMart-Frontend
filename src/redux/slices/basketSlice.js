import { createSlice } from "@reduxjs/toolkit";
import { getBasket, updateBasket } from "../apis/basket-api";

const initialValue = {
  // userId: "",
  items: [],
  totalPrice: 0,
  selectedItems: []
};

export const basketSlice = createSlice({
  name: "baskets",
  initialState: initialValue,
  reducers: {
    calculateSubtotal: (state) => {
      let subTotal = 0;
      state.items.map((item) => {
        subTotal += item.product.price * item.quantity;
      });
      state.totalPrice = subTotal;
      //   console.log(state.subTotal);
    },
    increaseItem: (state, action) => {
      const item = state.items.find((i) => i.product.id === action.payload);
      item.quantity++;
    },
    decreaseItem: (state, action) => {
      const item = state.items.find((i) => i.product.id === action.payload);
      item.quantity--;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
    setSelectedItems: (state, action) => {
      state.selectedItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    });
    builder.addCase(updateBasket.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    });
  },
});

export const { calculateSubtotal, increaseItem, decreaseItem, removeItem, setSelectedItems } =
  basketSlice.actions;
export const basketReducers = basketSlice.reducer;
