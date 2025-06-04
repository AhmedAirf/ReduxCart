/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "getProducts",
  async (i, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const request = await fetch("https://fakestoreapi.com/products", {
        cache: "force-cache",
      });
      const response = request.json();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const intial = {
  products: [],
  productsLoading: true,
  productError: "",
  cart: [],
};

const productSlice = createSlice({
  name: "products",
  initialState: intial,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingItem = state.cart.find(
        (item) => item.id === productToAdd.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...productToAdd, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.cart.find((item) => item.id === productId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== productId);
        }
      }
    },
    deleteFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.productsLoading = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.productsLoading = false;
      state.productError = action.error.message;
    });
  },
});

export const products = productSlice.reducer;
export const { addToCart, removeFromCart, deleteFromCart, clearCart } =
  productSlice.actions;
