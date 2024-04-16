import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const setWishList = createAsyncThunk(
  "wishlist/setWishlist",
  async (el, { rejectedWithValue }) => {
    const currUser = JSON.parse(localStorage.getItem("user")) || "";

    console.log(currUser?.id);

    try {
      const res = await fetch(
        `https://moneyservices.store/back/public/api/wishlist/${
          el.slug
        }?user_id=${currUser?.user?.id || currUser?.id}`
      );
      const data = await res.json();

      if (res.ok) {
        toast.success(data?.message);
      }
      return el;
    } catch (err) {
      return rejectedWithValue(err.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "wishlist/deleteItem",
  async (id, { rejectedWithValue }) => {
    const currUser = JSON.parse(localStorage.getItem("user")) || "";

    console.log(currUser?.id);

    try {
      const res = await fetch(
        `https://moneyservices.store/back/public/api/wishlist-delete?user_id=${
          currUser?.user?.id || currUser?.id
        }&product_id=${id}`
      );
      const data = await res.json();
      console.log(data, id);
      /* if (res.ok) {
        toast.success(data?.message);
      }
      console.log(data); */
      return id;
    } catch (err) {
      return rejectedWithValue(err.message);
    }
  }
);

export const getWishListData = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const currUser = JSON.parse(localStorage.getItem("user")) || "";

    console.log(currUser?.id);
    try {
      const res = await axios.get(
        `https://moneyservices.store/back/public/api/wishlist?user_id=${
          currUser?.user?.id || currUser?.id
        }`,
        {}
      );
      console.log(res.data.wishlist);
      return res.data.wishlist;
      // handle with toast
    } catch (err) {
      return rejectWithValue(err.response?.status);
    }
  }
);

const wishlist = createSlice({
  name: "wishlist",
  initialState: { wishlistData: null, isLoading: null, isError: "init" },
  reducers: {
    setIsError: (state) => {
      state.isError = "init";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishListData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWishListData.fulfilled, (state, action) => {
        state.isLoading = false;
        const extractedData = action.payload;
        state.wishlistData = extractedData;
      })
      .addCase(getWishListData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = "SERVER ERROR TRY AGAIN LATER...";
      });

    builder
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("inside delete case " + action.payload);
        if (state.wishlistData) {
          state.wishlistData = state?.wishlistData.filter(
            (item) => parseInt(item?.product_id) !== action.payload
          );
        }
        state.isError = "FALSE";

        /*         const extractedData = action.payload;
        state.wishlistData = extractedData; */
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = "TRUE";
      });

    builder.addCase(setWishList.pending, (state) => {
      state.data = null;
    }),
      builder.addCase(setWishList.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isError = "FALSE";
        //   state.data = [...state.data, action.payload];
        //action.payload);
      }),
      builder.addCase(setWishList.rejected, (state, action) => {
        state.data = null;
        state.isError = "TRUE";
      });
  },
});

export const { setIsError } = wishlist.actions;

export default wishlist.reducer;
