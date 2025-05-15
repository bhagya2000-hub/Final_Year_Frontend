import { configureStore } from "@reduxjs/toolkit";
import { ProductApi } from "./api/productApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";

import userReducer from "./feature/userSlice"
import cartReducer from "./feature/cardSlice"
import { orderApi } from "./api/oderApi";

export const store = configureStore({
  reducer: {
    auth:userReducer,
    cart: cartReducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([ProductApi.middleware,authApi.middleware,userApi.middleware,
      orderApi.middleware,
    ]),
});
