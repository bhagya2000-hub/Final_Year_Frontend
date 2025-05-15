import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

    shippingInfo:localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (i) => i.productId === item.productId
      );

      if (existingItemIndex > -1) {
        // If item exists, update its quantity
        state.cartItems[existingItemIndex].quantity = item.quantity;
      } else {
        // If item doesn't exist, add it
        state.cartItems.push(item);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
     localStorage.removeItem("cartItems");
      state.cartItems = [];
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex > -1) {
        state.cartItems[itemIndex].quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    saveShppingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
  }
});

export const { setCartItems, removeCartItem, updateCartItemQuantity,saveShppingInfo,clearCart } = cartSlice.actions;
export default cartSlice.reducer;