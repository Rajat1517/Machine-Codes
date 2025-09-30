import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    cart: {},
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      const id= action.payload.id;
      if(state.cart[id])state.cart[id].count++;
      else state.cart[id]= {count:1, product: action.payload};
    },
    removeFromCart: (state, action) => {
      const id= action.payload.id;
      if(state.cart[id]){
        const count= state.cart[id].count;
        if(count===1) delete state.cart[id];
        else state.cart[id].count--;
      }
    },
  },
});

export const { setProducts, addToCart, removeFromCart } = productSlice.actions;

export default productSlice.reducer;
