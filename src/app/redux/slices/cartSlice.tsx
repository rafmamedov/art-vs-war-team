import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CartItem } from "@/types/CartItem";
import getTotalPrice from "@/utils/calcTotalPrice";

export interface CartState {
  paintings: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  paintings: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPainting: (state, action: PayloadAction<CartItem>) => {
      state.paintings.push(action.payload);
      state.totalPrice = getTotalPrice(state.paintings);
    },
  },
});

export const { addPainting } = cartSlice.actions;

export default cartSlice.reducer;
