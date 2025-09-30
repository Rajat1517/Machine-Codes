import { configureStore } from "@reduxjs/toolkit";
import productApi from "./services/productAPI";
import productSlice from "./slices/productSlice";

const store= configureStore({
    reducer:{
        products: productSlice,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(productApi.middleware),
})


export default store;