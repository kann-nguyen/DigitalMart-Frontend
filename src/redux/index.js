import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./slices/userSlice";
import { productReducers } from "./slices/productSlice";
import modalReducer from "./slices/modalSlice";

import { categoryReducers } from "./slices/categorySlice";
import { basketReducers } from "./slices/basketSlice";
import { orderReducers } from "./slices/orderSlice";
import { inventoryReducers } from "./slices/inventorySlice";
import { favoriteReducers } from "./slices/favoriteSlice";
import { paginateReducers } from "./slices/paginationSlice";
import { loadingReducers } from "./slices/loadingSlice";

const rootReducer = combineReducers({

    user: userReducers,
    products: productReducers,
    categories: categoryReducers,
    baskets: basketReducers,
    orders: orderReducers,
    inventories: inventoryReducers,
    favorites: favoriteReducers,
    modal: modalReducer,
    paginates: paginateReducers,
    loading: loadingReducers
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
