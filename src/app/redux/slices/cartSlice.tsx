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
      if (state.paintings.length > 0) {
        const findPainting = state.paintings.find(
          (painting) => painting.id === action.payload.id
        );

        if (!findPainting) {
          state.paintings.push(action.payload);
          state.totalPrice = getTotalPrice(state.paintings);
        }
      } else {
        state.paintings.push(action.payload);
        state.totalPrice = getTotalPrice(state.paintings);
      }
    },

    removeItem(state, action: PayloadAction<CartItem | string>) {
      const findPainting = state.paintings.find(
        (painting) => painting.id === action.payload
      );

      if (findPainting) {
        state.paintings = state.paintings.filter(
          (item) => item !== findPainting
        );
      }

      state.totalPrice = getTotalPrice(state.paintings);
    },
  },
});

export const { addPainting, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
