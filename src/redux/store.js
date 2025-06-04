import { configureStore } from "@reduxjs/toolkit";
import { products } from "./slices/productSlice";

const Store = configureStore({
  reducer: {
    products,
  },
});

export default Store;
