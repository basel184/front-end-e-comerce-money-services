import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const HomeApi = createAsyncThunk("home/homeApi", async (_, { rejectedWithValue }) => {
  try {
    const response = await axios.get("https://moneyservices.store/back/public/api/home");
    return response.data;
  } catch (err) {
    return rejectedWithValue(err.message);
  }
});

const home = createSlice({
  name: "home",
  initialState: { isLoading: null, isError: null, data: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HomeApi.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
      state.data = null;
    });
    builder.addCase(HomeApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = null;
    });
    builder.addCase(HomeApi.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
      state.data = null;
    });
  },
});

export default home.reducer;
