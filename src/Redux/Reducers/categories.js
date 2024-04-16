import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await fetch(
        `https://moneyservices.store/back/public/api/category?locale=${localStorage.getItem("lng")}`
      );
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectedWithValue(err.message);
    }
  }
);

const categories = createSlice({
  name: "products",
  initialState: { isLoading: false, isError: null, data: null },
  reducers: {},
  extraReducers: (bulider) => {
    bulider.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
      state.data = null;
    }),
      bulider.addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = null;
      }),
      bulider.addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.data = null;
      });
  },
});

export default categories.reducer;
