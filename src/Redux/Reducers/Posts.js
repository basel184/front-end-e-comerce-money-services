import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PATH_API } from "../../Helper";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await fetch(`${PATH_API}posts&locale=${localStorage.getItem("lng")}`, {
        method: "GET",
        headers: {
          "Content-type": "json/application",
        },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectedWithValue(err.message);
    }
  }
);

const posts = createSlice({
  name: "posts",
  initialState: { isLoading: false, isError: null, data: null },
  reducers: {},
  extraReducers: (bulider) => {
    // get Products
    bulider.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
      state.data = null;
    }),
      bulider.addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = null;
      }),
      bulider.addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.data = null;
      });
  },
});

export default posts.reducer;
