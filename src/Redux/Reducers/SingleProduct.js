import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
let user = null;

if (typeof window !== "undefined") {
  user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
}

export const singleProduct = createAsyncThunk(
  "products/singleProduct",
  async (slug, { rejectedWithValue }) => {
    try {
      const response = await fetch(
        `https://moneyservices.store/back/public/api/product-detail/${slug}?user_id=${
          user?.user?.id ? user?.user?.id : user?.id
        }`
      );
      const data = await response.json();

      return data;
    } catch (err) {
      return rejectedWithValue(err.message);
    }
  }
);

const products = createSlice({
  name: "products",
  initialState: { isLoading: false, isError: null, data: null },
  reducers: {},
  extraReducers: (bulider) => {
    // get Products
    bulider.addCase(singleProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
      state.data = null;
    }),
      bulider.addCase(singleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = null;
      }),
      bulider.addCase(singleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.data = null;
      });
  },
});

export default products.reducer;
