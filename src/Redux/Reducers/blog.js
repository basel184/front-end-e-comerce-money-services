import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PATH_API } from "../../Helper";

let language = null;
if (typeof window !== "undefined") {
  language = window.localStorage.getItem("lng") === "ar" ? "arabic" : "english";
}

export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, { rejectedWithValue }) => {
    try {
      const res = await fetch(`${PATH_API}posts?locale=${language}`);
      const data = await res.json();

      return data;
    } catch (err) {
      return rejectedWithValue(err.message);
    }
  }
);

const blog = createSlice({
  name: "blog",
  initialState: { isLoading: false, data: null, isError: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogs.pending, (state) => {
      state.isLoading = true;
      state.data = null;
      state.isError = null;
    });
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.posts;
      state.isError = null;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.isError = action.error.message;
    });
  },
});

export default blog.reducer;
