import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
  },

  reducers: {
    addItem: (state, action) => {
      let existingItem = null;

      if (state.items.length > 0) {
        existingItem = state.items.find(
          (item) => item.id === action.payload.id,
        );
      }

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;

export const { addItem, removeItem, clearCart } = cartSlice.actions;
