import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};



export const productsFetch = createAsyncThunk(
  "products/productFetch",
  async () => {
    const response = await axios.get("http://localhost:8000/products");
    return response?.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },

    [productsFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },

    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

// export const {handleBtn}=productsSlice.actions

export default productsSlice.reducer;