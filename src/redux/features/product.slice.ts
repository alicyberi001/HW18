import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProducts, IProductsCus } from "../../types/products.type";

interface CartState {
  products: IProductsCus[];
  brandFilters: string[];
}

const initialState: CartState = {
  products: [],
  brandFilters: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProductsCus>) => {
      const existingItem = state.products.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(item => item.id !== action.payload);
    },
    setBrandFilters: (state, action: PayloadAction<string[]>) => {
      state.brandFilters = action.payload;
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.products.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.products.find(item => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setBrandFilters } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;


